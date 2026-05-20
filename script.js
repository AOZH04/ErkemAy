(function () {
    // Hero slider
    var slides = document.querySelectorAll('.hero_slide');
    var dots = document.querySelectorAll('.hero_dot');
    var current = 0;
    var timer;

    if (slides.length > 0) {
        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = index;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        function next() {
            goTo((current + 1) % slides.length);
        }

        function startTimer() {
            timer = setInterval(next, 5000);
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goTo(parseInt(dot.dataset.index));
                resetTimer();
            });
        });

        startTimer();
    }

    // Mobile menu
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');

    burger.addEventListener('click', function () {
        nav.classList.toggle('open');
        burger.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('open');
            burger.classList.remove('open');
        }
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            burger.classList.remove('open');
        });
    });

    // Smooth active nav highlight on scroll (index page only)
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.header_nav a[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
        function onScroll() {
            var scrollY = window.pageYOffset + 100;
            sections.forEach(function (section) {
                if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + section.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Gallery drag scroll
    var gallery = document.querySelector('.gallery_grid');
    if (gallery) {
        var isDragging = false;
        var startX;
        var scrollLeft;

        gallery.addEventListener('mousedown', function (e) {
            isDragging = true;
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        gallery.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            e.preventDefault();
            var x = e.pageX - gallery.offsetLeft;
            gallery.scrollLeft = scrollLeft - (x - startX);
        });

        gallery.addEventListener('mouseleave', function () {
            isDragging = false;
        });
    }

    // Documents page: search
    var docsSearch = document.getElementById('docs_search');
    if (docsSearch) {
        var noResults = document.getElementById('docs_no_results');

        docsSearch.addEventListener('input', function () {
            var query = this.value.toLowerCase().trim();
            var categories = document.querySelectorAll('.docs_category');
            var totalVisible = 0;

            categories.forEach(function (cat) {
                var items = cat.querySelectorAll('.doc_item');
                var visibleInCat = 0;

                items.forEach(function (item) {
                    var name = (item.dataset.name || '').toLowerCase();
                    if (!query || name.indexOf(query) !== -1) {
                        item.style.display = '';
                        visibleInCat++;
                        totalVisible++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                cat.style.display = visibleInCat > 0 ? '' : 'none';
            });

            if (noResults) {
                noResults.style.display = totalVisible === 0 ? 'block' : 'none';
            }
        });
    }

    // Documents page: sidebar active link on scroll
    var docCategories = document.querySelectorAll('.docs_category');
    if (docCategories.length > 0) {
        var sidebarLinks = document.querySelectorAll('.docs_sidebar_link');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id;
                    sidebarLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });

        docCategories.forEach(function (cat) {
            observer.observe(cat);
        });
    }
    // Nutrition section slide-in
    var nutritionImg = document.querySelector('.nutrition_img_wrap');
    var nutritionText = document.querySelector('.nutrition_text');
    if (nutritionImg && nutritionText) {
        nutritionImg.classList.add('from_left');
        nutritionText.classList.add('from_right');

        var nutritionObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                nutritionImg.classList.remove('from_left');
                nutritionText.classList.remove('from_right');
                nutritionObserver.disconnect();
            }
        }, { threshold: 0.2 });

        nutritionObserver.observe(nutritionImg);
    }

    // About section slide-in
    var aboutText = document.querySelector('.about_text');
    var aboutImg = document.querySelector('.about_img_wrap');
    if (aboutText && aboutImg) {
        aboutText.classList.add('from_left');
        aboutImg.classList.add('from_right');

        var aboutObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                aboutText.classList.remove('from_left');
                aboutImg.classList.remove('from_right');
                aboutObserver.disconnect();
            }
        }, { threshold: 0.2 });

        aboutObserver.observe(aboutText);
    }

    // Services cards stagger animation
    var servicesGrid = document.querySelector('.services_grid');
    if (servicesGrid) {
        var svcCards = servicesGrid.querySelectorAll('.service_card');
        svcCards.forEach(function (card) { card.classList.add('svc_hidden'); });

        var svcObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                svcCards.forEach(function (card, i) {
                    setTimeout(function () { card.classList.remove('svc_hidden'); }, i * 150);
                });
                svcObserver.disconnect();
            }
        }, { threshold: 0.1 });

        svcObserver.observe(servicesGrid);
    }

    // Advantages cards stagger animation
    var advantagesGrid = document.querySelector('.advantages_grid');
    if (advantagesGrid) {
        var advCards = advantagesGrid.querySelectorAll('.advantage_card');
        advCards.forEach(function (card) { card.classList.add('adv_hidden'); });

        var advObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                advCards.forEach(function (card, i) {
                    setTimeout(function () { card.classList.remove('adv_hidden'); }, i * 150);
                });
                advObserver.disconnect();
            }
        }, { threshold: 0.15 });

        advObserver.observe(advantagesGrid);
    }

    // Programs cards stagger animation
    var programsGrid = document.querySelector('.programs_grid');
    if (programsGrid) {
        var progCards = programsGrid.querySelectorAll('.program_card');
        progCards.forEach(function (card) { card.classList.add('prog_hidden'); });

        var progObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                progCards.forEach(function (card, i) {
                    setTimeout(function () { card.classList.remove('prog_hidden'); }, i * 150);
                });
                progObserver.disconnect();
            }
        }, { threshold: 0.15 });

        progObserver.observe(programsGrid);
    }

    // CTA stats counter
    var ctaStats = document.querySelector('.cta_stats');
    if (ctaStats) {
        var counters = ctaStats.querySelectorAll('.cta_stat strong');
        var counted = false;

        function animateCounters() {
            if (counted) return;
            counted = true;
            var duration = 1500;
            var start = performance.now();

            counters.forEach(function (el) {
                var text = el.textContent.trim();
                var suffix = text.replace(/[0-9]/g, '');
                var target = parseInt(text, 10);

                function tick(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }

        var statsObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.4 });

        statsObserver.observe(ctaStats);
    }

    // CTA parallax
    var ctaBg = document.querySelector('.cta_bg');
    var ctaSection = ctaBg ? ctaBg.closest('.cta_section') : null;

    function updateParallax() {
        if (!ctaBg || !ctaSection || window.innerWidth <= 850) {
            if (ctaBg) ctaBg.style.transform = '';
            return;
        }
        var rect = ctaSection.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.15;
        ctaBg.style.transform = 'translateY(' + offset + 'px)';
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();

}());
