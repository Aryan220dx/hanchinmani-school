import {
  Atom,
  BookOpen,
  Bot,
  BrainCircuit,
  Bus,
  Camera,
  CheckCircle2,
  ClipboardList,
  Code2,
  Dumbbell,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Library,
  Music,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";

export const contact = {
  institution: "Smt. Vidya P Hanchinmani International School, Dharwad",
  shortName: "Hanchinmani School",
  society: "Shantesh Education Society",
  address:
    "Behind Shri Mahalaxmi Petrol Bunk, Nuggikeri, Kalaghatagi Road, Dharwad - 580114, Karnataka, India",
  officePhone: "0836-2463232 / 0836-2463234",
  mobile: "6361120816 / 9019806938 / 9019861347",
  email: "hanchinmani.school@gmail.com",
  website: "hanchinmanicbseschool.com"
};

export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About School",
    href: "/about",
    children: [
      { label: "Our School", href: "/about" },
      { label: "Founder's Message", href: "/about/founders-message" },
      { label: "Principal's Message", href: "/about/principals-message" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Board of Members", href: "/about/board-of-members" }
    ]
  },
  { label: "Get In Touch", href: "/contact" },
  { label: "Academics", href: "/academics" },
  {
    label: "Our Campus",
    href: "/campus",
    children: [
      { label: "Infrastructure", href: "/campus#infrastructure" },
      { label: "Laboratories", href: "/campus#laboratories" },
      { label: "Library", href: "/campus#library" },
      { label: "Security", href: "/campus#security" },
      { label: "Transportation", href: "/campus#transportation" },
      { label: "Extra Curricular Activities", href: "/campus#extra-curricular" }
    ]
  },
  { label: "Mandatory Public Disclosure", href: "/mandatory-disclosure" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" }
];

export const leaders = [
  {
    name: "Prof. P. R. Hanchinmani",
    title: "Founder Chairman",
    organization: "Hanchinmani Institutes, Dharwad",
    image: "/images/leadership/prahlad-hanchinmani.jpg",
    quote:
      "Since 1994 his service in shaping the careers of thousands of students is remarkable. Today, the group of Hanchinmani Institutes means a large family of 200+ faculties, educators and educationists."
  },
  {
    name: "Shri Milind P. Hanchinmani",
    title: "Secretary",
    organization: "Shantesh Education Society",
    image: "/images/leadership/milind-hanchinmani.jpg",
    imagePosition: "object-[center_18%]",
    quote:
      "A technocrat and educational entrepreneur who joined Hanchinmani Institutes in 2011, playing a pivotal role in building Team Hanchinmani with a vision for North Karnataka."
  },
  {
    name: "Dr. Gururaj Karajagi",
    title: "Knowledge Partner",
    organization: "Chairman, Academy for Creative Teaching, Bangalore",
    image: "/images/leadership/gururaj-karajagi.jpg",
    quote:
      "A renowned educationist, teacher par excellence, mentor and cultural analyst with a mission of moulding young students into upright citizens contributing to Indian society."
  }
];

export const features = [
  { title: "Artificial Intelligence (AI)", description: "Training for software coding and artificial intelligence from the middle years.", icon: BrainCircuit },
  { title: "Robotics", description: "Hands-on robotics education encouraging innovation, engineering skills and practical problem solving.", icon: Bot },
  { title: "Science & Math Labs", description: "Experimental study through modern mathematics, composite science and computer labs.", icon: FlaskConical },
  { title: "Library", description: "A spacious, well-stocked library that supports reading, research and guided learning.", icon: Library },
  { title: "Music, Art & Yoga", description: "Specialized coaching for art, music, yoga, sports and self-defence.", icon: Music },
  { title: "Skill-Based Education", description: "Competency and skill-based education with experiential learning.", icon: Sparkles },
  { title: "Professional Faculty", description: "Professionally qualified and trained teachers with continuous quality audits.", icon: UsersRound },
  { title: "Health & Safety", description: "Fitness centre, medical facility, transport, safety and security systems.", icon: HeartPulse }
];

export const journey = [
  {
    range: "Primary",
    title: "Foundation Years",
    description: "Phonics, creative arts, emotional development and habits of curiosity.",
    points: ["English language confidence", "Creative expression", "Age-appropriate enrichment"]
  },
  {
    range: "Middle",
    title: "Discovery Years",
    description: "Advanced STEM exposure, bilingual confidence and early leadership practice.",
    points: ["Science and math labs", "AI, coding and robotics", "Telescope astronomy"]
  },
  {
    range: "Senior Secondary",
    title: "Direction Years",
    description: "CBSE academic depth with mentoring for future study and competitive pathways.",
    points: ["Foundation courses from Grade 6", "Career guidance", "Quality academic audits"]
  }
];

export const galleryImages = [
  { src: "/images/hero/campus-banner.jpg", alt: "Hanchinmani school campus banner" },
  { src: "/images/campus/infrastructure.jpg", alt: "School infrastructure" },
  { src: "/images/campus/laboratory.jpg", alt: "Laboratory learning environment" },
  { src: "/images/campus/library.jpg", alt: "School library" },
  { src: "/images/campus/transportation.jpg", alt: "School transportation" },
  { src: "/images/campus/safety.jpg", alt: "Safety at school" },
  { src: "/images/campus/security.jpg", alt: "School security" }
];

export const notices = [
  { date: "2026", title: "Admissions Open", body: "Application form and enquiry form are available for the new academic session." },
  { date: "CBSE", title: "Mandatory Public Disclosure", body: "Compliance information is available for parents and inspection bodies." },
  { date: "Campus", title: "Infrastructure Highlights", body: "10 acres campus, 35 spacious classrooms, labs, library, transport and sports facilities." }
];

export const testimonials = [
  { name: "Parent Community", grade: "Middle School", quote: "The school communicates with calm clarity and gives children strong academic routines." },
  { name: "Prospective Parent", grade: "Primary Years", quote: "The campus feels rooted, organized and serious about both learning and care." },
  { name: "Alumni Family", grade: "Senior Secondary", quote: "Hanchinmani's strength is its faculty ecosystem and focus on disciplined preparation." }
];

export const campusFacilities = [
  { id: "infrastructure", title: "10 Acres Campus", image: "/images/campus/infrastructure.jpg", icon: GraduationCap, body: "A broad institutional campus with 35 spacious classrooms and room for academic and co-curricular growth." },
  { id: "laboratories", title: "Laboratories", image: "/images/campus/laboratory.jpg", icon: Atom, body: "Modern mathematics, composite science and computer laboratory experiences support experimental study." },
  { id: "library", title: "Library & E-Library", image: "/images/campus/library.jpg", icon: BookOpen, body: "A spacious library and e-library facility create a calm culture of reading and research." },
  { id: "security", title: "Security & Safety", image: "/images/campus/security.jpg", icon: ShieldCheck, body: "Security, safety practices and medical support help parents trust the daily environment." },
  { id: "transportation", title: "Transportation", image: "/images/campus/transportation.jpg", icon: Bus, body: "Transportation access supports families across Dharwad and nearby areas." },
  { id: "extra-curricular", title: "Extra Curricular Activities", image: "/images/campus/safety.jpg", icon: Dumbbell, body: "Music, art-craft, self-defence, skating, yoga and outdoor games complete the school day." }
];

export const disclosureRows = [
  ["Name of School", contact.institution],
  ["Society", contact.society],
  ["Address", contact.address],
  ["Board", "CBSE"],
  ["Website", contact.website],
  ["Office Phone", contact.officePhone],
  ["Mobile", contact.mobile],
  ["Email", contact.email]
];

export const quickActions = [
  { label: "Get In Touch", href: "/contact", icon: ClipboardList },
  { label: "View Gallery", href: "/gallery", icon: Camera },
  { label: "Explore Academics", href: "/academics", icon: Code2 },
  { label: "Mandatory Disclosure", href: "/mandatory-disclosure", icon: CheckCircle2 },
  { label: "Parent Trust", href: "/about", icon: Star }
];
