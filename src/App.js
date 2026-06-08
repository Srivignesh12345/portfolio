import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { useInView as useInViewObs } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaWhatsapp, FaExternalLinkAlt, FaEnvelope, FaCode, FaShieldAlt, FaMobile, FaLeaf, FaBolt, FaDownload, FaBars, FaTimes, FaBriefcase } from 'react-icons/fa';
import './index.css';

/* ── DATA ─────────────────────────────────────── */
const skills = [
  { name: 'HTML & CSS', pct: 95 }, { name: 'Python', pct: 80 },
  { name: 'JavaScript', pct: 75 }, { name: 'React.js', pct: 70 },
  { name: 'Node.js', pct: 70 },   { name: 'MongoDB', pct: 60 },
  { name: 'MySQL', pct: 60 },     { name: 'TensorFlow', pct: 40 },
  { name: 'Java', pct: 40 },      { name: 'C / C++', pct: 30 },
];

const techs = ['Python','JavaScript','React.js','Node.js','Express.js','MongoDB','MySQL','TensorFlow','PyTorch','Arduino','Raspberry Pi','Git','Azure','Postman','Scapy'];

const projects = [
  { num:'01', icon:<FaMobile/>, title:'BEE QUEEN', desc:'Real-time beehive income tracker with hive health monitoring & earnings calculator for beekeepers.', tags:['React Native','Node.js','Mobile'], github:'#', live:'#', status:'live' },
  { num:'02', icon:<FaShieldAlt/>, title:'TRUSTIFY', desc:'Blockchain-based academic certificate verification with QR codes, tamper-proof ledger & role-based dashboards.', tags:['React','Node.js','Web3','Ethereum'], github:'https://github.com/Srivignesh12345/Trustify', live:'#', status:'live' },
  { num:'03', icon:<FaLeaf/>, title:'SMART CROP MONITORING', desc:'IoT-based agricultural monitoring system tracking soil moisture, temperature & humidity for smart irrigation.', tags:['Python','IoT','Sensors','Arduino'], github:'#', live:'#', status:'wip' },
  { num:'04', icon:<FaShieldAlt/>, title:'SHIELDLINK', desc:'Real-time network packet sniffer & ARP intrusion detector with modular threat detection patterns.', tags:['Python','Scapy','ARP','TCP/IP'], github:'https://github.com/Srivignesh12345/Shield-Link', live:'#', status:'live' },
  { num:'05', icon:<FaCode/>, title:'KML DIGITAL CARD', desc:'Sleek digital business card platform with modern UI and professional card sharing experience.', tags:['HTML','CSS'], github:'https://github.com/Srivignesh12345/KML-Digital-Card', live:'https://kalpanamicrolab.com', status:'live' },
  { num:'06', icon:<FaBolt/>, title:'STEPS TO WATT', desc:'Converts step count into estimated energy in watts, promoting sustainable energy awareness.', tags:['Python','IoT','Data Analytics'], github:'#', live:'#', status:'wip' },
];

const achievements = [
  { icon:'🥇', num:1, suffix:'st', label:'AI Datathon Winner' },
  { icon:'💻', num:120, suffix:'+', label:'LeetCode Solved' },
  { icon:'⭐', num:1866, suffix:'', label:'LeetCode Rating' },
  { icon:'🔥', num:150, suffix:'+', label:'SkillRack Solved' },
];

const education = [
  { year:'2023–2027', title:'B.E (CCE)', sub:'Sri Eshwar College of Engineering', score:'CGPA: 6.1' },
  { year:'2022–2023', title:'HSC', sub:'Vidyaa Vikas Hr. Sec. School', score:'69%' },
  { year:'2020–2021', title:'SSLC', sub:'Avvai KSR Matric High School', score:'Pass' },
];

const certs = [
  { name:'Mastering DSA using C and C++', platform:'Udemy', year:'2023' },
  { name:'Signals and Systems: From Basics to Advance', platform:'Udemy', year:'2024' },
  { name:'Microsoft Azure AZ-900, AZ-104, AZ-305', platform:'Udemy', year:'2025' },
  { name:'Machine Learning From Basic to Advanced', platform:'Udemy', year:'2025' },
];

/* ── CURSOR ───────────────────────────────────── */
function Cursor() {
  const cursor = useRef(null);
  const follower = useRef(null);
  useEffect(() => {
    const move = e => {
      if (cursor.current) { cursor.current.style.left = e.clientX + 'px'; cursor.current.style.top = e.clientY + 'px'; }
      setTimeout(() => { if (follower.current) { follower.current.style.left = (e.clientX - 18) + 'px'; follower.current.style.top = (e.clientY - 18) + 'px'; } }, 80);
    };
    const over = () => { cursor.current?.classList.add('hover'); follower.current?.classList.add('hover'); };
    const out  = () => { cursor.current?.classList.remove('hover'); follower.current?.classList.remove('hover'); };
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.project-card,.tech-icon').forEach(el => { el.addEventListener('mouseenter', over); el.addEventListener('mouseleave', out); });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (<><div className="cursor" ref={cursor} style={{position:'fixed',transform:'translate(-50%,-50%)',pointerEvents:'none'}}/><div className="cursor-follower" ref={follower} style={{position:'fixed',pointerEvents:'none'}}/></>);
}

/* ── PARTICLES BG ─────────────────────────────── */
function ParticlesBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({length:80},()=>({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx:(Math.random()-.5)*0.4, vy:(Math.random()-.5)*0.4,
      size: Math.random()*1.5+.5, opacity: Math.random()*0.5+0.1
    }));
    let mouse = {x:0, y:0};
    window.addEventListener('mousemove', e => { mouse.x=e.clientX; mouse.y=e.clientY; });
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        const dx=mouse.x-p.x, dy=mouse.y-p.y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){p.x-=dx*0.02; p.y-=dy*0.02;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,0,51,${p.opacity})`; ctx.fill();
        particles.slice(i+1).forEach(p2=>{
          const dx2=p.x-p2.x, dy2=p.y-p2.y, d=Math.sqrt(dx2*dx2+dy2*dy2);
          if(d<100){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y); ctx.strokeStyle=`rgba(255,0,51,${0.15*(1-d/100)})`; ctx.stroke(); }
        });
      });
      requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} style={{position:'absolute',inset:0,zIndex:1}} />;
}

/* ── SKILL BAR ────────────────────────────────── */
function SkillBar({name, pct}) {
  const [ref, inView] = useInViewObs({triggerOnce:true, threshold:0.3});
  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-header"><span className="skill-name">{name}</span><span className="skill-pct">{pct}%</span></div>
      <div className="skill-bar"><div className="skill-fill" style={{width: inView ? `${pct}%` : '0%'}} /></div>
    </div>
  );
}

/* ── ACHIEVE CARD ─────────────────────────────── */
function AchieveCard({icon, num, suffix, label}) {
  const [ref, inView] = useInViewObs({triggerOnce:true, threshold:0.3});
  return (
    <motion.div className="achieve-card" ref={ref} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}>
      <span className="achieve-icon">{icon}</span>
      <span className="achieve-num">
        {inView ? <><CountUp end={num} duration={2.5} />{suffix}</> : '0'}
      </span>
      <span className="achieve-label">{label}</span>
    </motion.div>
  );
}

/* ── NAVBAR ───────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50); window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h);},[]);
  const links = ['About','Skills','Projects','Internship','Education','Achievements','Contact'];
  return (
    <nav className={`navbar${scrolled?' scrolled':''}${menuOpen?' menu-open':''}`}>
      <a href="#hero" className="nav-logo">SRI<span>.</span>VIGNESH</a>
      <ul className={`nav-links${menuOpen?' open':''}`}>
        {links.map(s=>(
          <li key={s}><a href={`#${s.toLowerCase()}`} onClick={()=>setMenuOpen(false)}>{s}</a></li>
        ))}
      </ul>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <a href="mailto:srivignesh.s2023cce@sece.ac.in" className="nav-cta">Hire Me</a>
        <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

/* ── MAIN APP ─────────────────────────────────── */
export default function App() {
  const [formData, setFormData] = useState({name:'',email:'',message:''});

  return (
    <div>
      <Cursor />
      <div className="noise" />
      <div className="scanlines" />
      <Navbar />

      {/* HERO */}
      <section className="hero" id="hero">
        <ParticlesBg />
        <div className="bg-blob bg-blob-1" />
        <motion.div className="hero-content" initial={{opacity:0,x:-60}} animate={{opacity:1,x:0}} transition={{duration:0.9,ease:'easeOut'}}>
          <div className="hero-tag">AVAILABLE FOR HIRE</div>
          <h1 className="hero-name glitch" data-text="SRIVIGNESH">
            SRIVIGNESH<span>S.</span>
          </h1>
          <div className="hero-role">
            &gt;&nbsp;
            <TypeAnimation sequence={['Software Developer','AI Enthusiast','IoT Explorer','React Developer','Problem Solver']} wrapper="span" className="typed" speed={50} repeat={Infinity} deletionSpeed={70} />
          </div>
          <p className="hero-desc">
            Building the future with code — one commit at a time. Passionate about AI, IoT, and crafting digital experiences that make an impact.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-outline">Contact Me</a>
            <a href="/SRIVIGNESH S_CV(1).pdf" download className="btn-cv"><FaDownload style={{marginRight:'8px'}}/>Download CV</a>
          </div>
        </motion.div>

        <motion.div className="hero-img-wrap" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:1, delay:0.3}}>
          <div className="hero-img-spinner" />
          <div className="hero-img-ring">
            <img src={require('./profile.jpeg')} alt="Srivignesh" className="hero-img" />
          </div>
        </motion.div>

        <motion.div className="hero-stats" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.6}}>
          {[{num:'6+',label:'Projects Built'},{num:'120+',label:'LeetCode Solved'},{num:'1866',label:'LeetCode Rating'},{num:'150+',label:'SkillRack'}].map(s=>(
            <div className="stat-item" key={s.label}><span className="stat-num">{s.num}</span><span className="stat-label">{s.label}</span></div>
          ))}
        </motion.div>

        <div className="scroll-indicator">
          <div className="scroll-line"/>
          <span className="scroll-text">SCROLL</span>
        </div>
      </section>

      {/* INTERNSHIP */}
      <section id="internship" style={{background:'var(--dark3)'}}>
        <div className="section-tag">EXPERIENCE</div>
        <h2 className="section-title">INTERNSHIP <span>EXE</span></h2>
        <motion.div className="internship-card" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="internship-left">
            <div className="internship-icon"><FaBriefcase /></div>
            <div className="internship-line" />
          </div>
          <div className="internship-body">
            <div className="internship-meta">
              <span className="internship-company">BETTER TOMORROW</span>
              <span className="internship-year">2025</span>
            </div>
            <div className="internship-role">MERN Stack Developer Intern</div>
            <p className="internship-desc">Completed project-based MERN stack training with hands-on full-stack web development. Skilled in RESTful APIs, frontend-backend integration, and database operations.</p>
            <div className="internship-tags">
              {['MongoDB','Express.js','React.js','Node.js'].map(t=><span key={t} className="project-tag">{t}</span>)}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="bg-blob bg-blob-2" />
        <div className="section-tag">ABOUT ME</div>
        <h2 className="section-title">WHO AM <span>I?</span></h2>
        <div className="about-grid">
          <motion.div className="about-text" initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <p>I'm <span>Srivignesh S.</span>, a passionate Software Developer and AI enthusiast pursuing B.E in Computer & Communication Engineering at <span>Sri Eshwar College of Engineering</span>.</p>
            <p>I specialize in building full-stack web applications, mobile apps, and IoT systems. From blockchain platforms to network security tools — I love turning complex ideas into elegant solutions.</p>
            <p>Winner of the <span>AI Datathon at Sri Eshwar College (May 2025)</span> and an active competitive programmer with 120+ problems on LeetCode with a rating of <span>1866</span>.</p>
          </motion.div>
          <motion.div className="about-terminal" initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <div className="terminal-header">
              <div className="t-dot red"/><div className="t-dot yellow"/><div className="t-dot green"/>
              <span className="terminal-title">srivignesh@portfolio:~</span>
            </div>
            <div className="terminal-body">
              <div className="t-line"><span className="t-prompt">$</span><span className="t-cmd"> whoami</span></div>
              <div className="t-out"><span>Srivignesh S — Software Dev · AI · IoT</span></div>
              <div className="t-line"><span className="t-prompt">$</span><span className="t-cmd"> cat location.txt</span></div>
              <div className="t-out"><span>India 🇮🇳 · Tamil Nadu</span></div>
              <div className="t-line"><span className="t-prompt">$</span><span className="t-cmd"> cat education.txt</span></div>
              <div className="t-out"><span>B.E CCE @ Sri Eshwar · 2023-2027</span></div>
              <div className="t-line"><span className="t-prompt">$</span><span className="t-cmd"> cat stack.txt</span></div>
              <div className="t-out"><span>Python · JS · React · Node · IoT · AI</span></div>
              <div className="t-line"><span className="t-prompt">$</span><span className="t-cmd"> ./status.sh</span></div>
              <div className="t-out"><span style={{color:'#00ff88'}}>🟢 Available for Internships & Collabs</span></div>
              <div className="t-line"><span className="t-prompt" style={{animation:'blink 1s infinite'}}>█</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{background:'var(--dark)'}}>
        <div className="section-tag">TECH SKILLS</div>
        <h2 className="section-title">SKILL <span>MATRIX</span></h2>
        <div className="skills-grid">
          {skills.map(s => <SkillBar key={s.name} {...s} />)}
        </div>
        <div className="tech-icons">
          {techs.map(t => (
            <motion.div key={t} className="tech-icon" whileHover={{scale:1.05}} transition={{type:'spring',stiffness:300}}>{t}</motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projects">
        <div className="bg-blob bg-blob-1" />
        <div className="section-tag">WORK</div>
        <h2 className="section-title">PROJECT <span>VAULT</span></h2>
        <div className="projects-grid">
          {projects.map((p,i) => (
            <motion.div key={p.num} className="project-card"
              initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}>
              <div className={`project-status${p.status==='wip'?' wip':''}`}>
                <span className={`status-dot${p.status==='wip'?' wip':''}`}/>
                {p.status==='live'?'LIVE':'IN DEV'}
              </div>
              <span className="project-num">{p.num}</span>
              <div className="project-icon">{p.icon}</div>
              <div className="project-title">{p.title}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">{p.tags.map(t=><span key={t} className="project-tag">{t}</span>)}</div>
              <div className="project-links">
                {p.github!=='#'&&<a href={p.github} className="project-link" target="_blank" rel="noreferrer"><FaGithub /></a>}
                {p.live!=='#'&&<a href={p.live} className="project-link" target="_blank" rel="noreferrer"><FaExternalLinkAlt /></a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION & CERTS */}
      <section id="education" style={{background:'var(--dark)'}}>
        <div className="section-tag">BACKGROUND</div>
        <h2 className="section-title">EDUCATION & <span>CERTS</span></h2>
        <div className="edu-grid">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <h3 style={{fontFamily:'Orbitron',fontSize:'13px',letterSpacing:'3px',color:'var(--gray)',marginBottom:'32px'}}>{"// EDUCATION.LOG"}</h3>
            <div className="timeline">
              {education.map(e=>(
                <div className="timeline-item" key={e.year}>
                  <div className="timeline-year">{e.year}</div>
                  <div className="timeline-title">{e.title}</div>
                  <div className="timeline-sub">{e.sub}</div>
                  <div className="timeline-score">{e.score}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <h3 style={{fontFamily:'Orbitron',fontSize:'13px',letterSpacing:'3px',color:'var(--gray)',marginBottom:'32px'}}>{"// CERTIFICATIONS.STACK"}</h3>
            {certs.map(c=>(
              <div className="cert-card" key={c.name}>
                <span className="cert-icon">📜</span>
                <div className="cert-info"><div className="cert-name">{c.name}</div><div className="cert-platform">{c.platform}</div></div>
                <span className="cert-year">{c.year}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="achievements" id="achievements">
        <div className="section-tag">WINS</div>
        <h2 className="section-title">ACHIEVEMENT <span>LOG</span></h2>
        <div className="achieve-grid">
          {achievements.map(a=><AchieveCard key={a.label} {...a}/>)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:'var(--dark)'}}>
        <div className="bg-blob bg-blob-2" />
        <div className="section-tag">REACH OUT</div>
        <h2 className="section-title">CONTACT <span>ME</span></h2>
        <div className="contact-grid">
          <motion.div className="contact-info" initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}>
            <p>Open to internships, freelance projects, open source collaborations, and AI/IoT/Web development opportunities. Let's build something epic together.</p>
            <div className="contact-links">
              <a href="mailto:srivignesh.s2023cce@sece.ac.in" className="contact-link"><FaEnvelope className="contact-link-icon"/>srivignesh.s2023cce@sece.ac.in</a>
              <a href="https://github.com/Srivignesh12345" className="contact-link" target="_blank" rel="noreferrer"><FaGithub className="contact-link-icon"/>github.com/Srivignesh12345</a>
              <a href="https://www.linkedin.com/in/srivignesh-s-19a3b9291/" className="contact-link" target="_blank" rel="noreferrer"><FaLinkedin className="contact-link-icon"/>linkedin.com/in/srivignesh-s</a>
              <a href="https://wa.me/918608633110" className="contact-link" target="_blank" rel="noreferrer"><FaWhatsapp className="contact-link-icon"/>+91 86086 33110</a>
            </div>
          </motion.div>
          <motion.form className="contact-form" initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7}}
            onSubmit={e=>{e.preventDefault();alert('Message sent! I will get back to you soon 🚀');}}>
            <div className="form-group"><input className="form-input" placeholder="Your Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} required/></div>
            <div className="form-group"><input className="form-input" type="email" placeholder="Your Email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required/></div>
            <div className="form-group"><textarea className="form-textarea" placeholder="Your Message..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} required/></div>
            <button type="submit" className="form-submit">Send Message →</button>
          </motion.form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-logo">SRI<span>.</span>VIGNESH</span>
        <p className="footer-text">Crafted with <span>♥</span> & lots of ☕ — © 2026 Srivignesh S. All rights reserved.</p>
      </footer>
    </div>
  );
}
