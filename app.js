// app.js - Dynamic Resume Renderer

async function loadResume() {
  try {
    const response = await fetch('resume.json');
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading resume:', error);
    document.getElementById('app').innerHTML = '<div class="error"><h2>Error Loading Resume</h2><p>Unable to load resume data. Please try again later.</p></div>';
    return null;
  }
}

function renderResume(data) {
  const app = document.getElementById('app');
  app.innerHTML = renderHeader(data.header) + renderProfile(data.profile) + renderSkills(data.skills) + renderExperience(data.experience) + renderEducation(data.education) + renderSocial(data.social);
}

function renderHeader(header) {
  const contactLinks = header.contact.map(contact => {
    let icon = '';
    let url = contact.url;
    
    // Determine icon based on type
    switch(contact.type) {
      case 'email':
        icon = '✉️';
        url = 'mailto:' + contact.url;
        break;
      case 'phone':
        icon = '📱';
        url = 'tel:' + contact.url;
        break;
      case 'linkedin':
        icon = '💼';
        break;
      case 'github':
        icon = '👨‍💻';
        break;
      case 'website':
        icon = '🌐';
        break;
      default:
        icon = '🔗';
    }
    
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + icon + ' ' + contact.label + '</a>';
  }).join('');

  const photoHtml = header.photo ? '<img src="' + header.photo + '" alt="' + header.name + '" class="profile-photo">' : '';

  return '<header class="header"><div class="header-content"><div class="header-text"><h1>' + header.name + '</h1><p class="title">' + header.title + '</p><div class="contact">' + contactLinks + '</div></div>' + photoHtml + '</div></header>';
}

function renderProfile(profile) {
  return '<section class="section profile"><h2>👤 ' + profile.title + '</h2><p>' + profile.summary + '</p></section>';
}

function renderSkills(skills) {
  const renderSkillCategory = (category) => {
    const skillTags = category.items.map(skill => '<span class="skill-tag">' + skill + '</span>').join('');
    return '<div class="skill-category"><h3>' + category.category + '</h3><div class="skills-list">' + skillTags + '</div></div>';
  };

  const categories = skills.categories.map(renderSkillCategory).join('');
  return '<section class="section skills"><h2>🛠️ ' + skills.title + '</h2>' + categories + '</section>';
}

function renderExperience(experience) {
  const renderJob = (job) => {
    const achievements = job.achievements && job.achievements.length > 0
      ? '<ul>' + job.achievements.map(achievement => '<li>' + achievement + '</li>').join('') + '</ul>'
      : '';

    const locationText = job.location ? ' • ' + job.location : '';

    return '<div class="experience-item"><div class="experience-header"><div><h3>' + job.position + '</h3><p class="company">' + job.company + locationText + '</p></div><span class="date">' + job.period + '</span></div><p class="description">' + job.description + '</p>' + achievements + '</div>';
  };

  const jobs = experience.items.map(renderJob).join('');
  return '<section class="section experience"><h2>💼 ' + experience.title + '</h2>' + jobs + '</section>';
}

function renderEducation(education) {
  const renderDegree = (degree) => {
    const locationText = degree.location ? ' • ' + degree.location : '';
    const detailsHtml = degree.details ? '<p class="details">' + degree.details + '</p>' : '';

    return '<div class="education-item"><div class="education-header"><div><h3>' + degree.degree + '</h3><p class="institution">' + degree.institution + locationText + '</p></div><span class="date">' + degree.period + '</span></div>' + detailsHtml + '</div>';
  };

  const degrees = education.items.map(renderDegree).join('');
  return '<section class="section education"><h2>🎓 ' + education.title + '</h2>' + degrees + '</section>';
}

function renderSocial(social) {
  const renderActivity = (activity) => {
    const locationText = activity.location ? ' • ' + activity.location : '';
    const achievementsHtml = activity.achievements && activity.achievements.length > 0 
      ? '<ul>' + activity.achievements.map(achievement => '<li>' + achievement + '</li>').join('') + '</ul>' 
      : '';

    return '<div class="social-item"><div class="social-header"><div><h3>' + activity.role + '</h3><p class="organization">' + activity.organization + locationText + '</p></div><span class="date">' + activity.period + '</span></div><p class="description">' + activity.description + '</p>' + achievementsHtml + '</div>';
  };

  const activities = social.items.map(renderActivity).join('');
  return '<section class="section social"><h2>🤝 ' + social.title + '</h2>' + activities + '</section>';
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const resumeData = await loadResume();
  if (resumeData) {
    renderResume(resumeData);
  }
});
