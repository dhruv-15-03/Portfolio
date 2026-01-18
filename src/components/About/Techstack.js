import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiAws,
  DiMysql,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiDocker,
  SiKubernetes,
  SiFirebase,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot,
  SiGithubactions,
  SiTypescript,
  SiVuedotjs,
  SiMicrosoftazure,
  SiPowerbi,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiExpress,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiKeras,
  SiOpencv,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiOpenai,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

// Skill Categories with proficiency levels
const skillCategories = {
  languages: {
    title: "Languages",
    icon: "💻",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    skills: [
      { name: "Python", icon: DiPython, color: "#3776ab", level: 90 },
      { name: "Java", icon: DiJava, color: "#ed8b00", level: 85 },
      { name: "JavaScript", icon: DiJavascript1, color: "#f7df1e", level: 92 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6", level: 85 },
    ]
  },
  frontend: {
    title: "Frontend",
    icon: "🎨",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    skills: [
      { name: "React.js", icon: DiReact, color: "#61dafb", level: 90 },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 85 },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4fc08d", level: 75 },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4", level: 88 },
    ]
  },
  backend: {
    title: "Backend",
    icon: "⚙️",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    skills: [
      { name: "Node.js", icon: DiNodejs, color: "#339933", level: 88 },
      { name: "Express", icon: SiExpress, color: "#ffffff", level: 85 },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f", level: 80 },
      { name: "GraphQL", icon: SiGraphql, color: "#e10098", level: 75 },
    ]
  },
  databases: {
    title: "Databases",
    icon: "🗄️",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    skills: [
      { name: "MongoDB", icon: DiMongodb, color: "#47a248", level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 85 },
      { name: "MySQL", icon: DiMysql, color: "#4479a1", level: 82 },
      { name: "Redis", icon: SiRedis, color: "#dc382d", level: 75 },
    ]
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: "☁️",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    skills: [
      { name: "Azure", icon: SiMicrosoftazure, color: "#0078d4", level: 82 },
      { name: "AWS", icon: DiAws, color: "#ff9900", level: 78 },
      { name: "Docker", icon: SiDocker, color: "#2496ed", level: 85 },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5", level: 75 },
    ]
  },
  tools: {
    title: "Tools & Analytics",
    icon: "🔧",
    gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    skills: [
      { name: "Git", icon: DiGit, color: "#f05032", level: 90 },
      { name: "CI/CD", icon: SiGithubactions, color: "#2088ff", level: 85 },
      { name: "Fabric", icon: SiPowerbi, color: "#f2c811", level: 72 },
      { name: "Firebase", icon: SiFirebase, color: "#ffca28", level: 80 },
    ]
  },
  aiml: {
    title: "AI & Machine Learning",
    icon: "🧠",
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#ff6f00", level: 85 },
      { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c", level: 82 },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#f7931e", level: 88 },
      { name: "Keras", icon: SiKeras, color: "#d00000", level: 80 },
    ]
  },
  datascience: {
    title: "Data Science & NLP",
    icon: "📊",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    skills: [
      { name: "Pandas", icon: SiPandas, color: "#150458", level: 90 },
      { name: "NumPy", icon: SiNumpy, color: "#013243", level: 88 },
      { name: "OpenCV", icon: SiOpencv, color: "#5c3ee8", level: 78 },
      { name: "Jupyter", icon: SiJupyter, color: "#f37626", level: 92 },
    ]
  },
  genai: {
    title: "Generative AI & LLMs",
    icon: "✨",
    gradient: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    skills: [
      { name: "OpenAI", icon: SiOpenai, color: "#00a67e", level: 85 },
      { name: "HuggingFace", icon: FaRobot, color: "#ffcc00", level: 80 },
      { name: "LangChain", icon: SiOpenai, color: "#1c3c3c", level: 75 },
      { name: "RAG", icon: SiOpenai, color: "#7c3aed", level: 78 },
    ]
  }
};

// Interactive Skill Card Component
const SkillCard = ({ skill, index, isHovered, onHover, onLeave }) => {
  const IconComponent = skill.icon;
  const delay = index * 0.1;
  
  return (
    <div
      className="skill-card-3d"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        padding: "20px 15px",
        background: isHovered 
          ? "rgba(255, 255, 255, 0.1)" 
          : "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        borderRadius: "20px",
        border: isHovered 
          ? `2px solid ${skill.color}` 
          : "1px solid rgba(255, 255, 255, 0.1)",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered 
          ? "translateY(-15px) scale(1.05) rotateX(10deg)" 
          : "translateY(0) scale(1) rotateX(0deg)",
        boxShadow: isHovered 
          ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${skill.color}40`
          : "0 8px 32px rgba(0, 0, 0, 0.2)",
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
        minWidth: "100px",
        textAlign: "center",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glowing orb effect */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isHovered ? "80px" : "0px",
        height: isHovered ? "80px" : "0px",
        background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
        borderRadius: "50%",
        transition: "all 0.4s ease",
        zIndex: 0,
      }} />
      
      {/* Icon */}
      <div style={{
        position: "relative",
        zIndex: 1,
        fontSize: "3em",
        color: isHovered ? skill.color : "rgba(255, 255, 255, 0.9)",
        transition: "all 0.4s ease",
        filter: isHovered ? `drop-shadow(0 0 20px ${skill.color})` : "none",
        transform: isHovered ? "scale(1.2) rotateY(360deg)" : "scale(1)",
      }}>
        <IconComponent />
      </div>
      
      {/* Skill Name */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginTop: "12px",
        fontSize: "0.85em",
        fontWeight: "600",
        color: isHovered ? skill.color : "rgba(255, 255, 255, 0.8)",
        letterSpacing: "0.5px",
        transition: "all 0.3s ease",
      }}>
        {skill.name}
      </div>
      
      {/* Proficiency Bar */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginTop: "10px",
        height: "4px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "2px",
        overflow: "hidden",
      }}>
        <div style={{
          width: isHovered ? `${skill.level}%` : "0%",
          height: "100%",
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
          borderRadius: "2px",
          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isHovered ? `0 0 10px ${skill.color}` : "none",
        }} />
      </div>
      
      {/* Proficiency Percentage */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginTop: "6px",
        fontSize: "0.7em",
        color: isHovered ? skill.color : "transparent",
        transition: "all 0.3s ease 0.2s",
        fontWeight: "700",
      }}>
        {skill.level}%
      </div>
    </div>
  );
};

// Category Section Component
const CategorySection = ({ category, categoryKey }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  
  return (
    <div 
      style={{
        marginBottom: "40px",
        padding: "30px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        borderRadius: "30px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        transition: "all 0.4s ease",
        transform: isCategoryHovered ? "scale(1.01)" : "scale(1)",
        boxShadow: isCategoryHovered 
          ? "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          : "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsCategoryHovered(true)}
      onMouseLeave={() => setIsCategoryHovered(false)}
    >
      {/* Category Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "25px",
        gap: "12px",
      }}>
        <span style={{ 
          fontSize: "1.8em",
          filter: isCategoryHovered ? "drop-shadow(0 0 10px rgba(255,255,255,0.5))" : "none",
          transition: "all 0.3s ease",
          animation: isCategoryHovered ? "bounce 0.6s ease" : "none",
        }}>
          {category.icon}
        </span>
        <h3 style={{
          margin: 0,
          fontSize: "1.4em",
          fontWeight: "700",
          background: category.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px",
        }}>
          {category.title}
        </h3>
        {/* Animated line */}
        <div style={{
          flex: 1,
          height: "2px",
          background: isCategoryHovered ? category.gradient : "rgba(255,255,255,0.1)",
          borderRadius: "1px",
          marginLeft: "15px",
          transition: "all 0.4s ease",
          maxWidth: "100px",
        }} />
      </div>
      
      {/* Skills Grid */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {category.skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            isHovered={hoveredSkill === skill.name}
            onHover={() => setHoveredSkill(skill.name)}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
      </div>
    </div>
  );
};

function Techstack() {
  return (
    <Container style={{ marginTop: "30px" }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "10%",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "10%",
        width: "250px",
        height: "250px",
        background: "radial-gradient(circle, rgba(191, 90, 242, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        animation: "float 10s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />
      
      {/* Skills Grid - 2 columns on desktop */}
      <Row>
        <Col lg={6}>
          <CategorySection category={skillCategories.languages} categoryKey="languages" />
          <CategorySection category={skillCategories.backend} categoryKey="backend" />
          <CategorySection category={skillCategories.cloud} categoryKey="cloud" />
          <CategorySection category={skillCategories.aiml} categoryKey="aiml" />
        </Col>
        <Col lg={6}>
          <CategorySection category={skillCategories.frontend} categoryKey="frontend" />
          <CategorySection category={skillCategories.databases} categoryKey="databases" />
          <CategorySection category={skillCategories.tools} categoryKey="tools" />
          <CategorySection category={skillCategories.datascience} categoryKey="datascience" />
          <CategorySection category={skillCategories.genai} categoryKey="genai" />
        </Col>
      </Row>
      
      {/* Total Skills Counter */}
      <div style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "30px",
        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(191, 90, 242, 0.1))",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{
              fontSize: "3em",
              fontWeight: "800",
              background: "linear-gradient(135deg, #00d4ff, #bf5af2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>36+</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95em" }}>Technologies</div>
          </div>
          <div>
            <div style={{
              fontSize: "3em",
              fontWeight: "800",
              background: "linear-gradient(135deg, #bf5af2, #ff6b9d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>9</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95em" }}>Categories</div>
          </div>
          <div>
            <div style={{
              fontSize: "3em",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ff6b9d, #00ff88)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>∞</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95em" }}>Learning</div>
          </div>
        </div>
      </div>
      
      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .skill-card-3d:hover {
          z-index: 10;
        }
        
        @media (max-width: 768px) {
          .skill-card-3d {
            min-width: 80px !important;
            padding: 15px 10px !important;
          }
        }
      `}</style>
    </Container>
  );
}

export default Techstack;
