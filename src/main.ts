import * as THREE from 'three';

class EcoAgent {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  trail: THREE.Vector3[];
  color: THREE.Color;
  leader: EcoAgent | null;
  followers: EcoAgent[];
  phase: number;

  constructor(id: number, startPosition: THREE.Vector3, color: THREE.Color) {
    this.position = startPosition;
    this.velocity = new THREE.Vector3(
      Math.random() * 0.2 - 0.1,
      Math.random() * 0.2 - 0.1,
      0
    );
    this.trail = [startPosition.clone()];
    this.color = color;
    this.leader = null;
    this.followers = [];
    this.phase = Math.random() * Math.PI * 2;
  }

  update(time: number) {
    // Follow leader if exists
    if (this.leader) {
      const targetPosition = this.leader.trail[Math.max(0, this.leader.trail.length - 10)] || this.leader.position;
      const direction = targetPosition.clone().sub(this.position);
      const distance = direction.length();
      direction.normalize();
      
      // Add oscillating motion
      const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0);
      const oscillation = Math.sin(time * 0.002 + this.phase) * 0.5;
      direction.add(perpendicular.multiplyScalar(oscillation));
      
      // Adjust speed based on distance
      const speed = THREE.MathUtils.clamp(distance * 0.1, 0.05, 0.2);
      this.velocity.lerp(direction.multiplyScalar(speed), 0.1);
    } else {
      // Leader behavior: move in a flowing pattern
      this.phase += 0.02;
      const direction = new THREE.Vector3(
        Math.sin(time * 0.001 + this.phase) * 0.5,
        Math.cos(time * 0.0015 + this.phase) * 0.5,
        0
      );
      this.velocity.lerp(direction, 0.05);
    }

    // Update position
    this.position.add(this.velocity);
    
    // Wrap around screen edges
    const bounds = 30;
    if (this.position.x > bounds) this.position.x = -bounds;
    if (this.position.x < -bounds) this.position.x = bounds;
    if (this.position.y > bounds) this.position.y = -bounds;
    if (this.position.y < -bounds) this.position.y = bounds;

    // Update trail
    this.trail.push(this.position.clone());
    if (this.trail.length > 50) this.trail.shift();
  }
}

// Create agents
const agents: EcoAgent[] = [];
for (let i = 0; i < 25; i++) {
  const position = new THREE.Vector3(
    Math.random() * 40 - 20,
    Math.random() * 40 - 20,
    0
  );
  const color = new THREE.Color(Math.random() * 0xffffff);
  agents.push(new EcoAgent(i, position, color));
}

// Set up following chain
for (let i = 1; i < agents.length; i++) {
  agents[i].leader = agents[i - 1];
  agents[i - 1].followers.push(agents[i]);
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 30;

const agentMeshes: THREE.Mesh[] = [];
const trailLines: THREE.Line[] = [];

agents.forEach(agent => {
  const geometry = new THREE.SphereGeometry(0.2, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: agent.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(agent.position);
  scene.add(mesh);
  agentMeshes.push(mesh);

  const trailGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(50 * 3);
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const trailMaterial = new THREE.LineBasicMaterial({ 
    color: agent.color,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  const trailLine = new THREE.Line(trailGeometry, trailMaterial);
  scene.add(trailLine);
  trailLines.push(trailLine);
});

let time = 0;
function animate() {
  time++;
  requestAnimationFrame(animate);
  agents.forEach((agent, index) => {
    agent.update(time);
    agentMeshes[index].position.copy(agent.position);
    
    const positions = trailLines[index].geometry.attributes.position.array as Float32Array;
    agent.trail.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    trailLines[index].geometry.setDrawRange(0, agent.trail.length);
    trailLines[index].geometry.attributes.position.needsUpdate = true;
  });
  renderer.render(scene, camera);
}
animate();
