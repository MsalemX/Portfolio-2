document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor logic
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');

    document.addEventListener("mousemove", function (e) {
        cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    });

    // Typing Effect
    const texts = ["Flutter Mobile Developer", "UI/UX Enthusiast", "Problem Solver"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            typingElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait before typing next word
        } else {
            setTimeout(type, 100); // Typing speed
        }
    })();

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Project Data functionality
    const projectsData = {
        1: {
            title: "Project Name 1",
            desc: "This is a detailed description of Project 1. It explains the problem solved, the solution implemented, and the key features. For example: A complete e-commerce mobile app built with Flutter, featuring state management with BLoC, efficient API caching, and smooth animations.",
            img: "image/project1-detail.jpg", // Replace with your image
            tech: ["Flutter", "Dart", "Provider"],
            link: "https://github.com/MsalemX"
        },
        2: {
            title: "Project Name 2",
            desc: "Detailed description for Project 2. This might be a chat application using Firebase Firestore for real-time updates. It includes features like push notifications, media sharing, and user authentication.",
            img: "image/project2-detail.jpg", // Replace with your image
            tech: ["Flutter", "Firebase", "GetX"],
            link: "https://github.com/MsalemX"
        },
        3: {
            title: "Project Name 3",
            desc: "Detailed description for Project 3. A movie explorer app consuming a REST API. It showcases clean architecture, dependency injection, and advanced UI layouts.",
            img: "image/project3-detail.jpg", // Replace with your image
            tech: ["Flutter", "API", "Bloc"],
            link: "https://github.com/MsalemX"
        }
    };

    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalLink = document.getElementById('modal-link');
    const closeModal = document.querySelector('.close-modal');

    // Open Modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const data = projectsData[id];

            if (data) {
                // Populate Modal
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                // modalImg.src = data.img; // Uncomment when you have images
                modalImg.src = "https://via.placeholder.com/600x400?text=Project+Detail+Image"; // Placeholder
                modalLink.href = data.link;

                // Clear and Populate Tech Stack
                modalTech.innerHTML = '';
                data.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    modalTech.appendChild(span);
                });

                // Show Modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Disable scroll
            }
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Enable scroll
    });

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Basic implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column'; // Ensure column layout
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px'; // Adjust based on navbar height
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navLinks.style.padding = '1rem';
                navLinks.style.zIndex = '1000';
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
