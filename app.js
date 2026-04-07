// app.js - Resume rendering logic

// Fetch and load resume data
async function loadResume() {
    try {
        const response = await fetch('resume.json');
        if (!response.ok) {
            throw new Error('Failed to load resume data');
        }
        const data = await response.json();
        renderResume(data);
    } catch (error) {
        console.error('Error loading resume:', error);
        document.getElementById('content').innerHTML =
            '<p style="color: red;">Error loading resume data. Please check console for details.</p>';
    }
}

// Main render function
function renderResume(data) {
    renderHeader(data);
    renderProfile(data);
    renderSkills(data);
    renderExperience(data);
    renderEducation(data);
    renderSocial(data);
}

// Render header with name, title, and contact info
function renderHeader(data) {
    const header = document.getElementById('header');

    let html = '';

    // Photo (if exists)
    if (data.photo) {
        html += `<img src="${data.photo}" alt="${data.name}" class="photo" onerror="this.style.display='none'">`;
    }

    // Header content wrapper
    html += '<div class="header-content">';

    // Name and title
    html += `
        <h1>${data.name}</h1>
        <p class="title">${data.title}</p>
    `;

    // Contact links
    if (data.contact) {
        html += '<div class="contact">';
        if (data.contact.email) {
            html += `<a href="mailto:${data.contact.email}">${data.contact.email}</a>`;
        }
        if (data.contact.linkedin) {
            html += `<a href="${data.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`;
        }
        if (data.contact.github) {
            html += `<a href="${data.contact.github}" target="_blank" rel="noopener">GitHub</a>`;
        }
        html += '</div>';
    }

    html += '</div>'; // Close header-content

    header.innerHTML = html;
}

// Render profile section
function renderProfile(data) {
    if (!data.profile) return;

    const content = document.getElementById('content');
    const section = document.createElement('section');
    section.innerHTML = `
        <h2>Profile</h2>
        <div class="section-content">
            <p>${data.profile}</p>
        </div>
    `;
    content.appendChild(section);
}

// Render skills section
function renderSkills(data) {
    if (!data.skills) return;

    const content = document.getElementById('content');
    const section = document.createElement('section');

    let html = '<h2>Skills</h2><div class="section-content">';

    // Programming & Tools
    if (data.skills.programming) {
        html += `
            <div class="skills-group">
                <h4>Programming & Tools:</h4>
                <p class="skills-list">${data.skills.programming.join(', ')}</p>
            </div>
        `;
    }

    // Concepts
    if (data.skills.concepts) {
        html += `
            <div class="skills-group">
                <h4>Concepts:</h4>
                <p class="skills-list">${data.skills.concepts.join(', ')}</p>
            </div>
        `;
    }

    // Languages
    if (data.skills.languages) {
        const langs = Object.entries(data.skills.languages)
            .map(([lang, level]) => `${lang}: ${level}`)
            .join(' | ');
        html += `
            <div class="skills-group">
                <h4>Languages:</h4>
                <p class="skills-list">${langs}</p>
            </div>
        `;
    }

    html += '</div>';
    section.innerHTML = html;
    content.appendChild(section);
}

// Render experience section
function renderExperience(data) {
    if (!data.experience || data.experience.length === 0) return;

    const content = document.getElementById('content');
    const section = document.createElement('section');

    let html = '<h2>Experience</h2><div class="section-content">';

    data.experience.forEach(job => {
        html += `
            <div class="experience-item">
                <div class="item-title">${job.title}</div>
                <div class="item-company">${job.company}</div>
                <div class="item-period">${job.period}</div>
        `;

        if (job.achievements && job.achievements.length > 0) {
            html += '<ul class="achievements">';
            job.achievements.forEach(achievement => {
                html += `<li>${achievement}</li>`;
            });
            html += '</ul>';
        }

        html += '</div>';
    });

    html += '</div>';
    section.innerHTML = html;
    content.appendChild(section);
}

// Render education section
function renderEducation(data) {
    if (!data.education || data.education.length === 0) return;

    const content = document.getElementById('content');
    const section = document.createElement('section');

    let html = '<h2>Education</h2><div class="section-content">';

    data.education.forEach(edu => {
        html += `
            <div class="education-item">
                <div class="item-title">${edu.degree}</div>
                <div class="item-institution">${edu.institution}</div>
                <div class="item-period">${edu.period}</div>
            </div>
        `;
    });

    html += '</div>';
    section.innerHTML = html;
    content.appendChild(section);
}

// Render social involvement section
function renderSocial(data) {
    if (!data.social || data.social.length === 0) return;

    const content = document.getElementById('content');
    const section = document.createElement('section');

    let html = '<h2>Social Involvement</h2><div class="section-content">';

    data.social.forEach(item => {
        html += `
            <div class="social-item">
                <div class="item-title">${item.role}</div>
        `;

        if (item.organization) {
            html += `<div class="item-organization">${item.organization}</div>`;
        }

        html += `
                <div class="item-period">${item.period}</div>
            </div>
        `;
    });

    html += '</div>';
    section.innerHTML = html;
    content.appendChild(section);
}

// Load resume when page loads
document.addEventListener('DOMContentLoaded', loadResume);
