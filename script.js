const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const skillData = {
  aws: {
    count: '01 / 05',
    title: 'AWS & cloud architecture',
    description: 'Designing secure, highly available foundations with clear paths to scale, migrate, and optimize.',
    tags: ['EC2', 'S3', 'VPC', 'IAM', 'RDS / Aurora', 'Lambda', 'ALB / ELB', 'Auto Scaling', 'Route 53', 'CloudWatch', 'CloudTrail', 'Multi-AZ', 'NAT Gateway', 'VPC Peering', 'Cloud Migration', 'Cost Optimization', 'Security groups', 'Network security fundamentals', 'Least-privilege access', 'Compliance controls'],
    note: 'Resume signal: reduced AWS costs by 60–70% through rightsizing, automated resource management, and idle-resource cleanup.'
  },
  delivery: {
    count: '02 / 05',
    title: 'CI/CD & release',
    description: 'Turning build, deployment, and release validation into repeatable workflows that support zero-downtime production changes.',
    tags: ['CI/CD pipeline design', 'Jenkins (exposure)', 'GitLab CI/CD (exposure)', 'AWS CodePipeline (exposure)', 'Deployment automation', 'Release management', 'Git', 'GitHub Actions', 'JIRA', 'Agile', 'UAT / regression testing', 'Production support', 'Zero-downtime deployment'],
    note: 'Resume signal: supported zero-downtime production deployments and release validation across business-critical systems.'
  },
  platform: {
    count: '03 / 05',
    title: 'Containers & infrastructure as code',
    description: 'Working across containerized environments and declarative infrastructure practices for consistent delivery across dev and prod.',
    tags: ['Docker', 'Kubernetes (working knowledge)', 'AWS EKS (exposure)', 'Terraform', 'IaC concepts', 'Container deployment', 'Nginx', 'Linux'],
    note: 'Resume signal: container deployment across dev/prod with Terraform IaC concepts and practices.'
  },
  observability: {
    count: '04 / 05',
    title: 'Monitoring & logging',
    description: 'Making system behavior visible through metrics, logs, incident management, and root cause analysis.',
    tags: ['AWS CloudWatch', 'Prometheus (exposure)', 'Grafana (exposure)', 'ELK / Splunk (exposure)', 'SSRS', 'Power BI', 'Log analysis', 'Incident management', 'RCA'],
    note: 'Resume signal: improved data quality and operational reliability through validation utilities, monitoring, and root cause analysis.'
  },
  data: {
    count: '05 / 05',
    title: 'Databases & scripting',
    description: 'Combining automation and data fluency to remove manual work, tune performance, and keep operational workflows dependable.',
    tags: ['Python', 'Shell / Bash', 'PL/SQL', 'T-SQL', 'MS SQL Server', 'PostgreSQL', 'MySQL', 'Stored procedures', 'Query optimization', 'Schema design', 'Data governance', 'Backup & recovery'],
    note: 'Resume signal: reduced manual operational effort by 60% through automation with Python and PL/SQL.'
  }
};

const skillTabs = document.querySelectorAll('.skill-tab');
const skillTitle = document.querySelector('#skill-title');
const skillDescription = document.querySelector('#skill-description');
const skillTags = document.querySelector('#skill-tags');
const panelCount = document.querySelector('.panel-count');
const skillNote = document.querySelector('.skill-note span:last-child');
const skillPanel = document.querySelector('#skill-panel');

function renderSkill(key) {
  const skill = skillData[key];
  if (!skill || !skillTitle) return;
  skillTitle.textContent = skill.title;
  skillDescription.textContent = skill.description;
  panelCount.textContent = skill.count;
  skillTags.innerHTML = skill.tags.map((tag) => `<span>${tag}</span>`).join('');
  skillNote.innerHTML = skill.note.replace(/(60–70%|60%|zero-downtime production deployments and release validation)/g, '<strong>$1</strong>');
}

skillTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    skillTabs.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    skillPanel?.setAttribute('aria-labelledby', tab.id);
    renderSkill(tab.dataset.skill);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Hi Sanyukta,\n\n${message}\n\nMy email: ${email}`);
  formStatus.textContent = 'Opening your email app…';
  window.location.href = `mailto:nsanyu28@gmail.com?subject=${subject}&body=${body}`;
});
