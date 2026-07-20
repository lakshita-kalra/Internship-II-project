export type CandStatus = "Applied" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected";
export type JobStatus = "Active" | "Paused" | "Closed";
export type IvStatus = "Scheduled" | "Completed" | "Cancelled";

export interface Candidate {
  id: number; name: string; email: string; phone: string; role: string;
  skills: string[]; status: CandStatus; date: string; exp: string;
  location: string; initials: string; ci: number;
  aiScore: number; skillMatch: number; resumeScore: number;
  about: string; education: string; previousRole: string;
}
export interface Job {
  id: number; title: string; dept: string; location: string; type: string;
  count: number; posted: string; status: JobStatus; urgent: boolean;
  salary: string; deadline: string; description: string; requirements: string[];
}
export interface Interview {
  id: number; name: string; role: string; with: string;
  day: string; time: string; mode: "Video" | "In-Person"; round: string;
  initials: string; ci: number; status: IvStatus;
}

export const recruiter = {
  name: "Ananya Rao",
  title: "Senior Talent Acquisition Lead",
  company: "SmartHire Technologies",
  initials: "AR",
  email: "ananya.rao@smarthire.io",
};

export const candidates: Candidate[] = [
  { id:1, name:"Aarav Sharma", email:"aarav.sharma@gmail.com", phone:"+91 98001 11111", role:"Senior React Developer", skills:["React","TypeScript","Node.js","Redux"], status:"Shortlisted", date:"Jun 01", exp:"5 yrs", location:"Bengaluru", initials:"AS", ci:0, aiScore:92, skillMatch:88, resumeScore:85, about:"Experienced frontend engineer with strong React ecosystem knowledge and team leadership.", education:"B.Tech CSE — IIT Bombay 2019", previousRole:"Frontend Engineer at Razorpay"},
  { id:2, name:"Priya Nair", email:"priya.nair@outlook.com", phone:"+91 98002 22222", role:"Product Manager", skills:["Agile","Roadmapping","SQL","JIRA"], status:"Interview Scheduled", date:"May 28", exp:"7 yrs", location:"Mumbai", initials:"PN", ci:1, aiScore:87, skillMatch:82, resumeScore:90, about:"Strategic PM with proven track record in B2B SaaS products.", education:"MBA — IIM Ahmedabad 2017", previousRole:"Product Lead at Freshworks"},
  { id:3, name:"Rohan Verma", email:"rohan.verma@yahoo.com", phone:"+91 98003 33333", role:"UI/UX Designer", skills:["Figma","Tailwind","Prototyping","CSS"], status:"Applied", date:"Jun 10", exp:"3 yrs", location:"Delhi", initials:"RV", ci:2, aiScore:78, skillMatch:75, resumeScore:72, about:"Creative designer focused on building intuitive user experiences.", education:"B.Des — NID Ahmedabad 2021", previousRole:"UI Designer at Housing.com"},
  { id:4, name:"Sneha Kapoor", email:"sneha.k@proton.com", phone:"+91 98004 44444", role:"Data Scientist", skills:["Python","ML","TensorFlow","Pandas"], status:"Selected", date:"May 15", exp:"4 yrs", location:"Hyderabad", initials:"SK", ci:3, aiScore:95, skillMatch:93, resumeScore:88, about:"ML engineer specializing in NLP and recommendation systems.", education:"M.Tech AI — IIIT Hyderabad 2020", previousRole:"Data Scientist at Amazon"},
  { id:5, name:"Arjun Mehta", email:"arjun.mehta@gmail.com", phone:"+91 98005 55555", role:"DevOps Engineer", skills:["Docker","K8s","AWS","Terraform"], status:"Rejected", date:"May 20", exp:"6 yrs", location:"Pune", initials:"AM", ci:4, aiScore:65, skillMatch:60, resumeScore:70, about:"DevOps specialist with cloud infrastructure experience.", education:"B.Tech — VIT Vellore 2018", previousRole:"SRE at Infosys"},
  { id:6, name:"Ananya Pillai", email:"ananya.p@techcorp.com", phone:"+91 98006 66666", role:"Backend Developer", skills:["Go","PostgreSQL","Redis","gRPC"], status:"Shortlisted", date:"Jun 03", exp:"4 yrs", location:"Chennai", initials:"AP", ci:5, aiScore:84, skillMatch:80, resumeScore:82, about:"Backend engineer focused on distributed systems and microservices.", education:"B.Tech CSE — Anna University 2020", previousRole:"Backend Dev at Zoho"},
  { id:7, name:"Karan Joshi", email:"karan.j@startup.io", phone:"+91 98007 77777", role:"Full Stack Developer", skills:["Next.js","MongoDB","GraphQL","Docker"], status:"Interview Scheduled", date:"Jun 08", exp:"3 yrs", location:"Jaipur", initials:"KJ", ci:0, aiScore:81, skillMatch:77, resumeScore:79, about:"Full stack developer with startup experience and product mindset.", education:"B.Tech — MNIT Jaipur 2021", previousRole:"Full Stack at Meesho"},
  { id:8, name:"Meera Reddy", email:"meera.reddy@mail.com", phone:"+91 98008 88888", role:"QA Engineer", skills:["Selenium","Cypress","Jest","Postman"], status:"Applied", date:"Jun 12", exp:"2 yrs", location:"Bengaluru", initials:"MR", ci:1, aiScore:72, skillMatch:68, resumeScore:75, about:"QA engineer with automation testing expertise across web and mobile.", education:"B.E. CSE — BMS College 2022", previousRole:"QA at Wipro"},
  { id:9, name:"Vivek Patel", email:"vivek.p@devmail.com", phone:"+91 98009 99999", role:"Cloud Architect", skills:["Azure","GCP","Terraform","Python"], status:"Selected", date:"May 25", exp:"9 yrs", location:"Ahmedabad", initials:"VP", ci:2, aiScore:97, skillMatch:95, resumeScore:92, about:"Senior cloud architect with multi-cloud expertise.", education:"B.Tech — NIT Surat 2015", previousRole:"Cloud Architect at TCS"},
  { id:10, name:"Divya Singh", email:"divya.singh@company.in", phone:"+91 98010 10101", role:"Scrum Master", skills:["JIRA","Confluence","Agile","SAFe"], status:"Applied", date:"Jun 14", exp:"5 yrs", location:"Noida", initials:"DS", ci:3, aiScore:76, skillMatch:72, resumeScore:80, about:"Certified Scrum Master with enterprise agile transformation experience.", education:"MBA — MDI Gurgaon 2019", previousRole:"Scrum Master at HCL"},
  { id:11, name:"Rahul Bose", email:"rahul.bose@techgiant.com", phone:"+91 98011 11011", role:"iOS Developer", skills:["Swift","SwiftUI","CoreData","Xcode"], status:"Shortlisted", date:"Jun 02", exp:"4 yrs", location:"Kolkata", initials:"RB", ci:4, aiScore:83, skillMatch:79, resumeScore:81, about:"iOS specialist with published App Store applications.", education:"B.Tech CSE — Jadavpur 2020", previousRole:"iOS Dev at PhonePe"},
  { id:12, name:"Tanvi Agarwal", email:"tanvi.a@creative.co", phone:"+91 98012 12012", role:"Content Strategist", skills:["SEO","Copywriting","Analytics","CMS"], status:"Rejected", date:"May 18", exp:"3 yrs", location:"Delhi", initials:"TA", ci:5, aiScore:60, skillMatch:55, resumeScore:68, about:"Content strategist with B2B SaaS marketing background.", education:"BA English — Delhi University 2021", previousRole:"Content Lead at Hasura"},
];

export const jobs: Job[] = [
  { id:1, title:"Senior React Developer", dept:"Engineering", location:"Bengaluru", type:"Full-time", count:34, posted:"3 days ago", status:"Active", urgent:true, salary:"₹20-28 LPA", deadline:"Jul 15, 2026", description:"Lead frontend architecture for our core recruitment platform.", requirements:["5+ years React","TypeScript","Node.js","Team leadership"]},
  { id:2, title:"Product Manager", dept:"Product", location:"Mumbai", type:"Full-time", count:21, posted:"1 week ago", status:"Active", urgent:false, salary:"₹25-35 LPA", deadline:"Aug 02, 2026", description:"Drive product strategy for our B2B SaaS hiring platform.", requirements:["7+ years PM","SaaS experience","Data-driven mindset"]},
  { id:3, title:"UI/UX Designer", dept:"Design", location:"Remote", type:"Full-time", count:47, posted:"2 days ago", status:"Active", urgent:true, salary:"₹12-18 LPA", deadline:"Jul 10, 2026", description:"Design delightful user experiences across web and mobile.", requirements:["Figma expert","3+ years","Design systems"]},
  { id:4, title:"Data Scientist", dept:"Analytics", location:"Hyderabad", type:"Full-time", count:18, posted:"5 days ago", status:"Paused", urgent:false, salary:"₹18-24 LPA", deadline:"Jul 28, 2026", description:"Build ML models powering our AI candidate matching engine.", requirements:["Python/ML","4+ years","NLP","TensorFlow"]},
  { id:5, title:"DevOps Engineer", dept:"Infrastructure", location:"Pune", type:"Contract", count:12, posted:"1 week ago", status:"Active", urgent:false, salary:"₹15-20 LPA", deadline:"Jul 20, 2026", description:"Manage CI/CD and cloud infrastructure at scale.", requirements:["Docker/K8s","AWS","Terraform","5+ years"]},
  { id:6, title:"Backend Engineer (Go)", dept:"Engineering", location:"Chennai", type:"Full-time", count:9, posted:"2 weeks ago", status:"Active", urgent:false, salary:"₹16-22 LPA", deadline:"Aug 10, 2026", description:"Build high-performance microservices in Go.", requirements:["Go expert","PostgreSQL","Redis","Microservices"]},
  { id:7, title:"Content Strategist", dept:"Marketing", location:"Delhi", type:"Part-time", count:26, posted:"4 days ago", status:"Closed", urgent:false, salary:"₹8-12 LPA", deadline:"Jun 30, 2026", description:"Drive content marketing across all digital channels.", requirements:["SEO","Copywriting","B2B SaaS","3+ years"]},
];

export const interviews: Interview[] = [
  { id:1, name:"Priya Nair", role:"Product Manager", with:"Rajesh Kumar", day:"Today", time:"2:00 PM", mode:"Video", round:"HR Round", initials:"PN", ci:1, status:"Scheduled"},
  { id:2, name:"Karan Joshi", role:"Full Stack Developer", with:"Ankit Mehta", day:"Today", time:"4:30 PM", mode:"In-Person", round:"Technical", initials:"KJ", ci:0, status:"Scheduled"},
  { id:3, name:"Aarav Sharma", role:"Senior React Dev", with:"Pooja Singh", day:"Tomorrow", time:"10:00 AM", mode:"Video", round:"Final Round", initials:"AS", ci:2, status:"Scheduled"},
  { id:4, name:"Ananya Pillai", role:"Backend Developer", with:"Dev Kapoor", day:"Tomorrow", time:"3:00 PM", mode:"Video", round:"Technical", initials:"AP", ci:3, status:"Scheduled"},
  { id:5, name:"Rahul Bose", role:"iOS Developer", with:"Arjun Singh", day:"Jul 24", time:"11:00 AM", mode:"Video", round:"HR Round", initials:"RB", ci:4, status:"Scheduled"},
  { id:6, name:"Meera Reddy", role:"QA Engineer", with:"Suresh Kumar", day:"Jul 25", time:"2:30 PM", mode:"In-Person", round:"Technical", initials:"MR", ci:5, status:"Scheduled"},
  { id:7, name:"Vivek Patel", role:"Cloud Architect", with:"Arjun Singh", day:"Jul 14", time:"1:00 PM", mode:"Video", round:"Final Round", initials:"VP", ci:2, status:"Completed"},
  { id:8, name:"Sneha Kapoor", role:"Data Scientist", with:"Pooja Singh", day:"Jul 12", time:"3:30 PM", mode:"Video", round:"Technical", initials:"SK", ci:3, status:"Completed"},
];

export const monthlyData = [
  {m:"Jan",apps:38,hired:4},{m:"Feb",apps:52,hired:6},{m:"Mar",apps:44,hired:5},
  {m:"Apr",apps:61,hired:8},{m:"May",apps:57,hired:7},{m:"Jun",apps:74,hired:10},
  {m:"Jul",apps:82,hired:12},
];

export const sources = [
  {name:"LinkedIn",count:89,pct:36},{name:"Naukri",count:62,pct:25},
  {name:"Referral",count:48,pct:19},{name:"Direct",count:30,pct:12},{name:"Others",count:18,pct:8},
];

export const pipeline = [
  { stage: "Applied", count: 247, color: "var(--color-chart-2)" },
  { stage: "Screening", count: 128, color: "var(--color-info)" },
  { stage: "Interview", count: 64, color: "var(--color-warning)" },
  { stage: "Offer", count: 22, color: "var(--color-chart-5)" },
  { stage: "Hired", count: 14, color: "var(--color-success)" },
];

export const activity = [
  {id:1,text:"New application from",name:"Divya Singh",role:"Scrum Master",time:"10 min ago",kind:"application"},
  {id:2,text:"Interview scheduled with",name:"Karan Joshi",role:"Full Stack Dev",time:"1 hour ago",kind:"interview"},
  {id:3,text:"Candidate selected",name:"Vivek Patel",role:"Cloud Architect",time:"3 hours ago",kind:"selected"},
  {id:4,text:"Shortlisted",name:"Rahul Bose",role:"iOS Developer",time:"5 hours ago",kind:"shortlisted"},
  {id:5,text:"Rejected",name:"Arjun Mehta",role:"DevOps Engineer",time:"Yesterday",kind:"rejected"},
  {id:6,text:"Offer sent to",name:"Sneha Kapoor",role:"Data Scientist",time:"Yesterday",kind:"offer"},
];

export const notifications = [
  {id:1,title:"New Application",msg:"Divya Singh applied for Scrum Master",time:"10 min ago",read:false,kind:"application" as const},
  {id:2,title:"Interview Reminder",msg:"Priya Nair HR Round starts in 30 minutes",time:"30 min ago",read:false,kind:"interview" as const},
  {id:3,title:"Candidate Selected",msg:"Vivek Patel accepted the offer",time:"2 hrs ago",read:false,kind:"success" as const},
  {id:4,title:"Job Posted",msg:"Senior React Developer role is now live",time:"5 hrs ago",read:true,kind:"job" as const},
  {id:5,title:"Interview Done",msg:"Sneha Kapoor Technical round completed",time:"Yesterday",read:true,kind:"interview" as const},
];

export const avatarGradients = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#10b981,#22c55e)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
  "linear-gradient(135deg,#0891b2,#0d9488)",
];
