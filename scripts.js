document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Text Generate Effect
    const textElements = document.querySelectorAll('.text-generate');
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Chat functionality
    const chatBox = document.querySelector('.chat-box');
    const chatMessages = document.querySelector('.chat-messages');
    const aiTitle = document.querySelector('.ai-title');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    const industries = [
        { name: 'Finance', color: '#4299E1' },
        { name: 'Healthcare', color: '#48BB78' },
        { name: 'Retail', color: '#ED8936' },
        { name: 'Manufacturing', color: '#9F7AEA' },
        { name: 'Technology', color: '#F56565' }
    ];

    let currentIndustryIndex = 0;

    const conversations = {
        Finance: [
            { sender: 'ai', message: "Hello! How can I assist with your financial analysis today?" },
            { sender: 'user', message: "Can you provide a summary of our Q2 revenue?" },
            { sender: 'ai', message: "Certainly! Here's a summary of Q2 revenue:\n• Total revenue: $10.5M (up 15% from Q1)\n• Top product line: Investment Services ($4.2M)\n• Fastest growing segment: Robo-advisory (30% growth)\n• Regional breakdown: North America (60%), Europe (25%), Asia (15%)" }
        ],
        Healthcare: [
            { sender: 'ai', message: "Welcome! How can I help with your healthcare data analysis?" },
            { sender: 'user', message: "What are our current patient satisfaction rates?" },
            { sender: 'ai', message: "Here's an overview of our current patient satisfaction rates:\n• Overall satisfaction: 88% (up 5% from last quarter)\n• Highest rated area: Nursing care (92% satisfaction)\n• Area for improvement: Wait times (75% satisfaction)\n• 95% of patients would recommend our hospital" }
        ],
        Retail: [
            { sender: 'ai', message: "Hi there! How can I assist with your retail analytics today?" },
            { sender: 'user', message: "What were our top-selling products this month?" },
            { sender: 'ai', message: "Here are our top-selling products for this month:\n1. Wireless earbuds (15,000 units)\n2. Smart home security system (12,500 units)\n3. Fitness tracker watch (10,000 units)\n4. 4K Ultra HD TV (8,000 units)\n5. Robot vacuum cleaner (7,500 units)" }
        ],
        Manufacturing: [
            { sender: 'ai', message: "Greetings! How can I help with your manufacturing data today?" },
            { sender: 'user', message: "What's our current production efficiency rate?" },
            { sender: 'ai', message: "I've analyzed our current production efficiency:\n• Overall efficiency rate: 87% (up 3% from last month)\n• Most efficient line: Assembly Line A (92%)\n• Least efficient line: Packaging Line C (78%)\n• Main improvement factor: New automated quality control system\n• Estimated annual savings: $2.5M due to efficiency improvements" }
        ],
        Technology: [
            { sender: 'ai', message: "Hello! How can I assist with your tech analytics today?" },
            { sender: 'user', message: "What are our current software development cycle times?" },
            { sender: 'ai', message: "Here's an analysis of our current software development cycle times:\n• Average cycle time: 3.5 weeks (down 20% from last quarter)\n• Fastest team: Mobile App Team (2.8 weeks)\n• Longest phase: Testing (35% of cycle time)\n• Most improved: DevOps implementation reduced deployment time by 50%\n• Next focus area: Reducing code review bottlenecks" }
        ]
    };

    function updateChat() {
        const industry = industries[currentIndustryIndex];
        aiTitle.textContent = `${industry.name} AI Assistant`;
        chatBox.style.borderColor = industry.color;
        
        chatMessages.innerHTML = '';
        conversations[industry.name].forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', msg.sender);
            messageDiv.textContent = msg.message;
            chatMessages.appendChild(messageDiv);
        });
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            currentIndustryIndex = (currentIndustryIndex - 1 + industries.length) % industries.length;
            updateChat();
        });

        nextArrow.addEventListener('click', () => {
            currentIndustryIndex = (currentIndustryIndex + 1) % industries.length;
            updateChat();
        });
    }

    // Initialize the chat if elements exist
    if (chatBox && chatMessages && aiTitle) {
        updateChat();
    }

    // Testimonial carousel
    const testimonialContainer = document.querySelector('.testimonial-carousel');
    if (testimonialContainer) {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
        testimonials.forEach(testimonial => {
            const clone = testimonial.cloneNode(true);
            testimonialContainer.appendChild(clone);
        });
    }

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});
