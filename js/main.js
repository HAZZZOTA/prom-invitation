document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const introScreen = document.getElementById('intro-screen');
    const continueBtn = document.getElementById('continue-btn');
    const mainContent = document.getElementById('main-content');
    const musicToggle = document.getElementById('music-toggle');
    const ambientMusic = document.getElementById('ambient-music');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const noResponse = document.getElementById('no-response');
    const finalScreen = document.getElementById('final-screen');
    
    // NO Button Responses
    const noResponses = [
        "are you sure?",
        "even after surviving roblox horror together?",
        "high cortisol meant nothing?",
        "what about the nyeker incident",
        "okay this is getting personal",
        "so the snowplowing was for nothing?",
        "remember when you disconnected in the middle of a game?",
        "i thought we had something special",
        "one last chance?",
        "please?",
        "i'll be waiting at prom anyway",
        "with or without you",
        "just kidding, i really want you there",
        "okay fine, last chance for real",
        "pretty please?"
    ];
    
    let noClickCount = 0;
    let yesBtnSize = 1;
    
    // Continue Button Click
    continueBtn.addEventListener('click', function() {

        try {
            ambientMusic.volume = 0.3;
            await ambientMusic.play();

            musicToggle.classList.add('playing');
        } catch (err) {
            console.log("Mobile autoplay blocked:", err);
        }
        
        introScreen.style.opacity = '0';
        
        setTimeout(function() {
            introScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Trigger initial fade-in for first section
            const firstSection = document.querySelector('.letter-section');
            if (firstSection) {
                setTimeout(function() {
                    firstSection.classList.add('visible');
                }, 100);
            }
        }, 1000);
    });
    
    // Music Toggle
    musicToggle.addEventListener('click', function() {
        if (ambientMusic.paused) {
            ambientMusic.play().then(function() {
                musicToggle.classList.add('playing');
            }).catch(function(error) {
                console.log("Audio play failed:", error);
            });
        } else {
            ambientMusic.pause();
            musicToggle.classList.remove('playing');
        }
    });
    
    // Scroll Animations
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.letter-section:not(.visible)');
        
        sections.forEach(function(section) {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    });
    
    // NO Button Click
    noBtn.addEventListener('click', function() {
        if (noClickCount < noResponses.length) {
            noResponse.querySelector('p').textContent = noResponses[noClickCount];
            noResponse.classList.remove('hidden');
            noClickCount++;
            
            // Increase YES button size slightly
            yesBtnSize += 0.05;
            yesBtn.style.transform = `scale(${yesBtnSize})`;
        } else {
            // Reset if all responses are shown
            noClickCount = 0;
            noResponse.querySelector('p').textContent = noResponses[0];
        }
    });
    
    // YES Button Click
    yesBtn.addEventListener('click', function() {
        // Fade out main content
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 1.5s ease';
        
        // Hide music toggle
        musicToggle.style.opacity = '0';
        musicToggle.style.transition = 'opacity 1.5s ease';
        
        setTimeout(function() {
            mainContent.classList.add('hidden');
            musicToggle.classList.add('hidden');
            
            // Show final screen
            finalScreen.classList.remove('hidden');
            
            setTimeout(function() {
                finalScreen.classList.add('show');
                
                // Optional: Fade in music
                if (!ambientMusic.paused) {
                    ambientMusic.volume = 0.3;
                }
            }, 100);
        }, 1500);
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
