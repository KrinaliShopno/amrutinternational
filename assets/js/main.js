document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // STICKY HEADER
    // ==========================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // ==========================================
    // DYNAMIC ACTIVE MENU HIGHLIGHTING
    // ==========================================
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath) {
        currentPath = currentPath.split('?')[0].split('#')[0];
    }
    if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
    }
    
    // Normalize detail pages to their main categories
    let targetPath = currentPath;
    if (currentPath.startsWith('blog-detail-')) {
        targetPath = 'blog.html';
    } else if (currentPath === 'product-detail.html') {
        targetPath = 'products.html';
    }
    
    // Clear all active classes first
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find matching link
    let matched = false;
    
    // Check dropdown items first (dropdown links are inside dropdown-menu)
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === targetPath) {
            const parentNavItem = link.closest('.nav-item');
            if (parentNavItem) {
                parentNavItem.classList.add('active');
                matched = true;
            }
        }
    });
    
    // If not matched in dropdowns, check main nav links
    if (!matched) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === targetPath) {
                const parentNavItem = link.closest('.nav-item');
                if (parentNavItem) {
                    parentNavItem.classList.add('active');
                }
            }
        });
    }

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon if using FA
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Mobile Dropdown Accordion
    const navItemsWithDropdown = document.querySelectorAll('.nav-item');
    navItemsWithDropdown.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                // Only act as accordion on mobile screens
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });

    // ==========================================
    // FLOATING WHATSAPP CHAT WIDGET
    // ==========================================
    const whatsappWidget = document.querySelector('.whatsapp-widget');
    const whatsappTrigger = document.querySelector('.whatsapp-trigger-btn');
    
    if (whatsappWidget && whatsappTrigger) {
        whatsappTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            whatsappWidget.classList.toggle('active');
        });

        // Close widget box when clicking outside
        document.addEventListener('click', function(e) {
            if (!whatsappWidget.contains(e.target)) {
                whatsappWidget.classList.remove('active');
            }
        });
    }
});
