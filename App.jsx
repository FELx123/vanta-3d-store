import { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

const products = [
  { name: 'Studio Coach Jacket', type: 'coach', category: 'NEW COLLECTION · 2026', price: '$89', description: 'Everyday layers. Designed to stand out.', colors: ['#a85f37', '#272b3c', '#d8dce8'] },
  { name: 'Cloud Puffer', type: 'puffer', category: 'WINTER ESSENTIALS', price: '$129', description: 'Lightweight warmth, oversized comfort.', colors: ['#e4472d', '#d7dce5', '#25252b'] },
  { name: 'Essential Hoodie', type: 'hoodie', category: 'DAILY UNIFORM', price: '$65', description: 'Soft fleece. A relaxed everyday fit.', colors: ['#b9cde5', '#b7a1c9', '#343434'] },
  { name: 'Track Jacket', type: 'track', category: 'SPORT / STREET', price: '$79', description: 'Sport-inspired lines with a clean finish.', colors: ['#343c82', '#181818', '#e6e7ed'] },
]

function Garment({ product, color }) {
  const fabric = useMemo(() => new THREE.MeshStandardMaterial({
    color, roughness: product.type === 'puffer' ? 0.88 : 0.72,
    metalness: 0.01
  }), [color, product.type])
  const seam = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f5edf7', roughness: 0.8 }), [])
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.72), roughness: 0.8 }), [color])
  const buttonMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d9c7a6', metalness: 0.2, roughness: 0.4 }), [])

  return (
    <group position={[0, -0.05, 0]} rotation={[0, -0.18, 0]}>
      {/* Stylized procedural garment. Swap this group for a licensed .glb clothing model for photorealism. */}
      <mesh material={fabric} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.55, 1.85, 0.48, 4, 6, 2]} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.93, 0.05, 0]} rotation={[0, 0, side * -0.22]}>
          <mesh material={fabric} castShadow receiveShadow position={[0, -0.02, 0]}>
            <capsuleGeometry args={[0.205, 1.02, 7, 12]} />
          </mesh>
          <mesh material={dark} position={[0, -0.64, 0]}>
            <cylinderGeometry args={[0.18, 0.19, 0.16, 24]} />
          </mesh>
        </group>
      ))}
      {/* Collar */}
      <mesh material={dark} position={[-0.18, 0.95, 0.08]} rotation={[0.2, 0, 0.2]} castShadow>
        <boxGeometry args={[0.38, 0.22, 0.15]} />
      </mesh>
      <mesh material={fabric} position={[0.18, 0.95, 0.08]} rotation={[0.2, 0, -0.2]} castShadow>
        <boxGeometry args={[0.38, 0.22, 0.15]} />
      </mesh>
      {/* Front placket */}
      <mesh material={dark} position={[0, 0, 0.25]}>
        <boxGeometry args={[0.075, 1.78, 0.035]} />
      </mesh>
      {[0.55, 0.2, -0.15, -0.5].map((y) => (
        <mesh key={y} material={buttonMat} position={[0.04, y, 0.28]}>
          <sphereGeometry args={[0.035, 14, 10]} />
        </mesh>
      ))}
      {/* Chest pocket */}
      <mesh material={dark} position={[0.42, 0.22, 0.258]}>
        <boxGeometry args={[0.34, 0.27, 0.025]} />
      </mesh>
      <mesh material={fabric} position={[0.42, 0.22, 0.275]}>
        <boxGeometry args={[0.29, 0.22, 0.025]} />
      </mesh>
      {product.type === 'puffer' && [-0.65, -0.3, 0.05, 0.4, 0.7].map((y) => (
        <mesh key={y} material={seam} position={[0, y, 0.247]}>
          <boxGeometry args={[1.5, 0.018, 0.018]} />
        </mesh>
      ))}
      {product.type === 'track' && [-0.45, 0.45].map((x) => (
        <mesh key={x} material={seam} position={[x, 0, 0.252]}>
          <boxGeometry args={[0.025, 1.78, 0.02]} />
        </mesh>
      ))}
      {product.type === 'hoodie' && (
        <>
          <mesh material={fabric} position={[0, 1.02, -0.12]} scale={[1, 1.0, 0.72]} castShadow>
            <sphereGeometry args={[0.39, 24, 18]} />
          </mesh>
          {[-0.13, 0.13].map(x => <mesh key={x} material={seam} position={[x, -0.45, 0.3]}>
            <cylinderGeometry args={[0.012, 0.012, 0.48, 8]} />
          </mesh>)}
        </>
      )}
      <mesh material={dark} position={[0, -0.94, 0]}>
        <boxGeometry args={[1.54, 0.1, 0.49]} />
      </mesh>
    </group>
  )
}

function Scene({ product, color }) {
  return (
    <Canvas shadows camera={{ position: [0, 0.7, 6.6], fov: 35 }} dpr={[1, 2]}>
      <color attach="background" args={['#f4f0f8']} />
      <ambientLight intensity={1.2} />
      <hemisphereLight intensity={1.5} groundColor="#b9adc9" />
      <directionalLight position={[-3, 5, 5]} intensity={3} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[4, 2, -4]} intensity={2} color="#d9c8ff" />
      <Garment product={product} color={color} />
      <ContactShadows position={[0, -1.75, 0]} opacity={0.28} scale={4} blur={2.5} far={3} />
      <Environment preset="studio" />
      <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.08} minDistance={3.6} maxDistance={9} minPolarAngle={0.4} maxPolarAngle={Math.PI * 0.82} target={[0, 0, 0]} />
    </Canvas>
  )
}

export default function App() {
  const [selected, setSelected] = useState(0)
  const [colorIndex, setColorIndex] = useState(0)
  const product = products[selected]
  const color = product.colors[colorIndex]

  function chooseProduct(index) {
    setSelected(index)
    setColorIndex(0)
  }

  return (
    <>
      <header className="header">
        <div className="brand">VANTA<span>VIRTUAL STORE</span></div>
        <nav><b>New arrivals</b><span>Clothing</span><span>Outerwear</span><span>About</span></nav>
        <div className="header-icons" aria-hidden="true"><span>⌕</span><span>♡</span><span>☰</span></div>
      </header>
      <main className="layout">
        <section className="viewer">
          <div className="view-label">VANTA / <b>INTERACTIVE 3D</b></div>
          <div className="view-hint">DRAG — AYLANTIRISH · SCROLL — ZOOM</div>
          <Scene product={product} color={color} />
          <div className="product-meta">
            <div className="eyebrow">{product.category}</div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="swatches" aria-label="Kiyim rangi">
              {product.colors.map((swatch, i) => (
                <button key={swatch} className={`swatch ${i === colorIndex ? 'chosen' : ''}`}
                  style={{ background: swatch }} aria-label={`Rang ${i + 1}`}
                  aria-pressed={i === colorIndex} onClick={() => setColorIndex(i)} />
              ))}
            </div>
          </div>
          <div className="price">{product.price}</div>
        </section>
        <aside className="sidebar">
          <div className="side-title"><h2>Explore clothing</h2><span>3D PREVIEW ↗</span></div>
          <div className="product-list">
            {products.map((p, i) => (
              <button key={p.name} className={`product-card ${i === selected ? 'active' : ''}`}
                onMouseEnter={() => chooseProduct(i)} onFocus={() => chooseProduct(i)} onClick={() => chooseProduct(i)}>
                <div className="product-swatch" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, #eee8f5)` }}>
                  <span className={`mini-shape ${p.type}`} />
                </div>
                <div className="card-copy"><strong>{p.name}</strong><small>{['Outerwear · Unisex','Jackets · Winter','Fleece · Relaxed fit','Sportswear · Light'][i]}</small><em>{p.price}</em></div>
              </button>
            ))}
          </div>
          <p className="note">Kiyimni aylantirish uchun 3D model ustida sichqonchani torting. Telefon ekranida barmoq bilan aylantiring va ikki barmoq bilan zoom qiling.</p>
        </aside>
      </main>
      <footer><span>VANTA VIRTUAL STORE</span><span>3D fashion concept · Built with React + Three.js</span></footer>
    </>
  )
}
