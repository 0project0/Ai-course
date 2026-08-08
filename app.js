/**
 * ====================================================================
 * 🚀 Sheren AI Video Masterclass - App Core & Security Engine
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- State Variables ---
    let currentModuleIndex = 0;
    let currentLessonIndex = 0;
    let completedLessons = JSON.parse(localStorage.getItem('sheren_course_completed_lessons') || '[]');
    let currentSpeed = 1.0;

    // --- DOM Elements ---
    const video = document.getElementById('courseVideo');
    const videoSource = document.getElementById('videoSource');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const bufferBar = document.getElementById('bufferBar');
    const currentTimeEl = document.getElementById('currentTime');
    const totalDurationEl = document.getElementById('totalDuration');
    const volumeMuteBtn = document.getElementById('volumeMuteBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const speedBtn = document.getElementById('speedBtn');
    const speedLabel = document.getElementById('speedLabel');
    const speedOptions = document.getElementById('speedOptions');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    const playerWrapper = document.getElementById('playerWrapper');

    // Navigation & Info Elements
    const currentModuleTitle = document.getElementById('currentModuleTitle');
    const currentLessonBreadcrumb = document.getElementById('currentLessonBreadcrumb');
    const currentLessonTitle = document.getElementById('currentLessonTitle');
    const lessonDescriptionText = document.getElementById('lessonDescriptionText');
    const prevLessonBtn = document.getElementById('prevLessonBtn');
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    const markCompleteBtn = document.getElementById('markCompleteBtn');
    const completeBtnText = document.getElementById('completeBtnText');
    const syllabusAccordion = document.getElementById('syllabusAccordion');
    const courseProgressFill = document.getElementById('courseProgressFill');
    const progressPercentText = document.getElementById('progressPercentText');
    const completedCount = document.getElementById('completedCount');
    const totalLessonsCount = document.getElementById('totalLessonsCount');
    const lessonSearchInput = document.getElementById('lessonSearchInput');
    const securityShield = document.getElementById('securityShield');
    const resumePlaybackBtn = document.getElementById('resumePlaybackBtn');

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Flattened Lessons Helper
    function getAllLessonsFlat() {
        const flatList = [];
        COURSE_DATA.modules.forEach((mod, modIdx) => {
            mod.lessons.forEach((les, lesIdx) => {
                flatList.push({
                    ...les,
                    moduleIdx: modIdx,
                    lessonIdx: lesIdx,
                    moduleTitle: mod.title
                });
            });
        });
        return flatList;
    }

    // Initialize Course Structure
    function initCourse() {
        renderSyllabus();
        updateProgressStats();
        loadLesson(0, 0);
        setupSecurityEngine();
    }

    // Render Syllabus Accordion
    function renderSyllabus(filterText = '') {
        syllabusAccordion.innerHTML = '';

        COURSE_DATA.modules.forEach((module, modIdx) => {
            const matchesFilter = module.lessons.some(l => l.title.toLowerCase().includes(filterText.toLowerCase()));
            
            const moduleEl = document.createElement('div');
            moduleEl.className = `module-item ${modIdx === currentModuleIndex || filterText ? 'open' : ''}`;

            const headerEl = document.createElement('div');
            headerEl.className = 'module-header';
            headerEl.innerHTML = `
                <div class="module-title-box">
                    <span class="module-title">${module.title}</span>
                    <span class="module-count">${module.lessons.length} دروس</span>
                </div>
                <i class="ri-arrow-down-s-line module-toggle-icon"></i>
            `;

            headerEl.addEventListener('click', () => {
                moduleEl.classList.toggle('open');
            });

            const lessonsListEl = document.createElement('div');
            lessonsListEl.className = 'lessons-list';

            module.lessons.forEach((lesson, lesIdx) => {
                if (filterText && !lesson.title.toLowerCase().includes(filterText.toLowerCase())) {
                    return;
                }

                const isCurrent = modIdx === currentModuleIndex && lesIdx === currentLessonIndex;
                const isCompleted = completedLessons.includes(lesson.id);

                const lessonEl = document.createElement('div');
                lessonEl.className = `lesson-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
                
                let iconClass = 'ri-play-circle-line';
                if (isCompleted) iconClass = 'ri-checkbox-circle-fill';
                if (isCurrent) iconClass = 'ri-film-fill';

                lessonEl.innerHTML = `
                    <div class="lesson-title-info">
                        <i class="${iconClass} lesson-status-icon"></i>
                        <span class="lesson-name">${lesson.title}</span>
                    </div>
                    <span class="lesson-duration">${lesson.duration}</span>
                `;

                lessonEl.addEventListener('click', () => {
                    loadLesson(modIdx, lesIdx);
                    if (window.innerWidth <= 1024) {
                        playerWrapper.scrollIntoView({ behavior: 'smooth' });
                    }
                });

                lessonsListEl.appendChild(lessonEl);
            });

            moduleEl.appendChild(headerEl);
            moduleEl.appendChild(lessonsListEl);
            syllabusAccordion.appendChild(moduleEl);
        });
    }

    // Helper to extract Google Drive File ID
    function getGoogleDriveId(url) {
        if (!url) return null;
        const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]{25,50})/);
        return match ? match[1] : null;
    }

    // Load Specific Lesson
    function loadLesson(modIdx, lesIdx) {
        const module = COURSE_DATA.modules[modIdx];
        if (!module || !module.lessons[lesIdx]) return;

        currentModuleIndex = modIdx;
        currentLessonIndex = lesIdx;

        const lesson = module.lessons[lesIdx];

        // Update Meta UI
        currentModuleTitle.textContent = module.title;
        currentLessonBreadcrumb.textContent = lesson.title;
        currentLessonTitle.textContent = lesson.title;
        lessonDescriptionText.textContent = lesson.description || "لا يوجد وصف لهذا الدرس حالياً.";

        // Update Complete Button
        const isCompleted = completedLessons.includes(lesson.id);
        if (isCompleted) {
            markCompleteBtn.classList.add('completed');
            completeBtnText.textContent = 'مكتمل ✓';
        } else {
            markCompleteBtn.classList.remove('completed');
            completeBtnText.textContent = 'تحديد كـ مكتمل';
        }

        // Load Video (Hybrid Google Drive & Custom Player)
        const driveId = getGoogleDriveId(lesson.videoUrl);
        const customControls = document.getElementById('customControls');
        let driveFrame = document.getElementById('driveVideoFrame');

        if (driveId) {
            video.style.display = 'none';
            if (customControls) customControls.style.display = 'none';
            try { video.pause(); } catch(e) {}

            if (!driveFrame) {
                driveFrame = document.createElement('iframe');
                driveFrame.id = 'driveVideoFrame';
                driveFrame.setAttribute('allow', 'autoplay; fullscreen');
                driveFrame.setAttribute('allowfullscreen', 'true');
                driveFrame.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 16px; display: block;';
                playerWrapper.appendChild(driveFrame);
            }
            driveFrame.style.display = 'block';
            driveFrame.src = `https://drive.google.com/file/d/${driveId}/preview`;
        } else {
            if (driveFrame) driveFrame.style.display = 'none';
            video.style.display = 'block';
            if (customControls) customControls.style.display = 'flex';

            video.pause();
            videoSource.src = lesson.videoUrl;
            video.load();
            playIcon.className = 'ri-play-fill';
        }

        // Update Navigation Buttons
        const flatList = getAllLessonsFlat();
        const currentFlatIndex = flatList.findIndex(l => l.moduleIdx === modIdx && l.lessonIdx === lesIdx);
        
        prevLessonBtn.disabled = currentFlatIndex <= 0;
        nextLessonBtn.disabled = currentFlatIndex >= flatList.length - 1;

        renderSyllabus(lessonSearchInput.value);
    }

    // Toggle Play / Pause
    function togglePlay() {
        if (video.paused) {
            video.play().then(() => {
                playIcon.className = 'ri-pause-fill';
            }).catch(err => {
                console.warn("Autoplay or playback prevented:", err);
            });
        } else {
            video.pause();
            playIcon.className = 'ri-play-fill';
        }
    }

    // Format Seconds to MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Player Event Listeners
    playPauseBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('loadedmetadata', () => {
        totalDurationEl.textContent = formatTime(video.duration);
        const currentLesson = COURSE_DATA.modules[currentModuleIndex]?.lessons[currentLessonIndex];
        if (currentLesson && currentLesson.duration.startsWith('فيديو')) {
            currentLesson.duration = formatTime(video.duration);
            const durationEl = document.querySelector(`.lesson-item.active .lesson-duration`);
            if (durationEl) {
                durationEl.textContent = formatTime(video.duration);
            }
        }
    });

    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
        totalDurationEl.textContent = formatTime(video.duration);

        // Update Buffer
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const bufferPercent = (bufferedEnd / video.duration) * 100;
            bufferBar.style.width = `${bufferPercent}%`;
        }
    });

    video.addEventListener('ended', () => {
        playIcon.className = 'ri-play-fill';
        markCurrentLessonCompleted();
        // Auto Next Lesson
        const flatList = getAllLessonsFlat();
        const currentFlatIndex = flatList.findIndex(l => l.moduleIdx === currentModuleIndex && l.lessonIdx === currentLessonIndex);
        if (currentFlatIndex < flatList.length - 1) {
            const nextLesson = flatList[currentFlatIndex + 1];
            loadLesson(nextLesson.moduleIdx, nextLesson.lessonIdx);
            video.play();
        }
    });

    // Smooth Seeking Engine (RTL & LTR Compatible + Drag Support)
    let isScrubbing = false;

    function seekVideo(e) {
        if (!video.duration || !isFinite(video.duration)) return;
        const rect = progressContainer.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const isRtl = getComputedStyle(document.body).direction === 'rtl';
        let pos;
        if (isRtl) {
            pos = (rect.right - clientX) / rect.width;
        } else {
            pos = (clientX - rect.left) / rect.width;
        }
        pos = Math.max(0, Math.min(1, pos));
        video.currentTime = pos * video.duration;
        progressBar.style.width = `${pos * 100}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
    }

    progressContainer.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        seekVideo(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isScrubbing) {
            seekVideo(e);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isScrubbing) {
            isScrubbing = false;
        }
    });

    // Touch Support for Mobile Dragging
    progressContainer.addEventListener('touchstart', (e) => {
        isScrubbing = true;
        seekVideo(e);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (isScrubbing) {
            seekVideo(e);
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (isScrubbing) {
            isScrubbing = false;
        }
    });

    // Rewind / Forward Buttons (10 Seconds)
    rewindBtn.addEventListener('click', () => {
        if (!video.duration || !isFinite(video.duration)) return;
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardBtn.addEventListener('click', () => {
        if (!video.duration || !isFinite(video.duration)) return;
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    });

    // Speed Controls
    speedOptions.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            speedOptions.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const speed = parseFloat(btn.dataset.speed);
            video.playbackRate = speed;
            speedLabel.textContent = `${speed}x`;
        });
    });

    // Volume Slider
    volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        video.volume = val;
        if (val === 0) {
            volumeIcon.className = 'ri-volume-mute-line';
        } else if (val < 0.5) {
            volumeIcon.className = 'ri-volume-down-line';
        } else {
            volumeIcon.className = 'ri-volume-up-line';
        }
    });

    volumeMuteBtn.addEventListener('click', () => {
        if (video.volume > 0) {
            video.dataset.lastVolume = video.volume;
            video.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.className = 'ri-volume-mute-line';
        } else {
            const last = parseFloat(video.dataset.lastVolume || 1);
            video.volume = last;
            volumeSlider.value = last;
            volumeIcon.className = last < 0.5 ? 'ri-volume-down-line' : 'ri-volume-up-line';
        }
    });

    // Fullscreen Toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            if (playerWrapper.requestFullscreen) {
                playerWrapper.requestFullscreen();
            } else if (playerWrapper.webkitRequestFullscreen) {
                playerWrapper.webkitRequestFullscreen();
            }
            fullscreenIcon.className = 'ri-fullscreen-exit-line';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            fullscreenIcon.className = 'ri-fullscreen-line';
        }
    });

    // Lesson Nav Buttons
    prevLessonBtn.addEventListener('click', () => {
        const flatList = getAllLessonsFlat();
        const currentFlatIndex = flatList.findIndex(l => l.moduleIdx === currentModuleIndex && l.lessonIdx === currentLessonIndex);
        if (currentFlatIndex > 0) {
            const prev = flatList[currentFlatIndex - 1];
            loadLesson(prev.moduleIdx, prev.lessonIdx);
        }
    });

    nextLessonBtn.addEventListener('click', () => {
        const flatList = getAllLessonsFlat();
        const currentFlatIndex = flatList.findIndex(l => l.moduleIdx === currentModuleIndex && l.lessonIdx === currentLessonIndex);
        if (currentFlatIndex < flatList.length - 1) {
            const next = flatList[currentFlatIndex + 1];
            loadLesson(next.moduleIdx, next.lessonIdx);
        }
    });

    // Completion Status
    function markCurrentLessonCompleted() {
        const currentLesson = COURSE_DATA.modules[currentModuleIndex].lessons[currentLessonIndex];
        if (!completedLessons.includes(currentLesson.id)) {
            completedLessons.push(currentLesson.id);
            localStorage.setItem('sheren_course_completed_lessons', JSON.stringify(completedLessons));
            markCompleteBtn.classList.add('completed');
            completeBtnText.textContent = 'مكتمل ✓';
            updateProgressStats();
            renderSyllabus(lessonSearchInput.value);
        }
    }

    markCompleteBtn.addEventListener('click', () => {
        const currentLesson = COURSE_DATA.modules[currentModuleIndex].lessons[currentLessonIndex];
        if (completedLessons.includes(currentLesson.id)) {
            completedLessons = completedLessons.filter(id => id !== currentLesson.id);
            markCompleteBtn.classList.remove('completed');
            completeBtnText.textContent = 'تحديد كـ مكتمل';
        } else {
            completedLessons.push(currentLesson.id);
            markCompleteBtn.classList.add('completed');
            completeBtnText.textContent = 'مكتمل ✓';
        }
        localStorage.setItem('sheren_course_completed_lessons', JSON.stringify(completedLessons));
        updateProgressStats();
        renderSyllabus(lessonSearchInput.value);
    });

    function updateProgressStats() {
        const flatList = getAllLessonsFlat();
        totalLessonsCount.textContent = flatList.length;
        completedCount.textContent = completedLessons.length;
        const percent = Math.round((completedLessons.length / flatList.length) * 100) || 0;
        courseProgressFill.style.width = `${percent}%`;
        progressPercentText.textContent = `${percent}%`;
    }

    // Search Filtering
    lessonSearchInput.addEventListener('input', (e) => {
        renderSyllabus(e.target.value);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowRight') {
            video.currentTime = Math.min(video.duration, video.currentTime + 5);
        } else if (e.code === 'ArrowLeft') {
            video.currentTime = Math.max(0, video.currentTime - 5);
        } else if (e.code === 'KeyF') {
            fullscreenBtn.click();
        }
    });

    // ====================================================================
    // 🛡️ SILENT ANTI-DOWNLOAD & ANTI-RECORDING SECURITY ENGINE
    // ====================================================================
    function setupSecurityEngine() {

        // 1. Disable Right Click Context Menu silently
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // 2. Disable Inspect & Download Keyboard Shortcuts silently
        document.addEventListener('keydown', (e) => {
            // Block F12
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            // Block Ctrl+Shift+I / J / C
            if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
                e.preventDefault();
                return false;
            }
            // Block Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
            if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 80)) {
                e.preventDefault();
                return false;
            }
        });

        // 3. Pause video silently on Window Blur / Tab Switch to prevent background screen recording
        window.addEventListener('blur', () => {
            if (!video.paused) {
                video.pause();
                playIcon.className = 'ri-play-fill';
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && !video.paused) {
                video.pause();
                playIcon.className = 'ri-play-fill';
            }
        });
    }

    // Launch Application
    initCourse();
});
