function initDiscordOverlay(discordInviteLink) {
    const style = document.createElement('style');
    style.textContent = `
        .discord-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            z-index: 9999;
            transition: background-color 0.5s ease, backdrop-filter 0.5s ease;
        }
        .discord-overlay.active {
            background-color: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
        }
        .discord-embed {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background-color: #5865F2;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            color: #ffffff;
            font-family: 'Arial', sans-serif;
            opacity: 0;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 320px;
        }
        .discord-overlay.active .discord-embed {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        .discord-embed p {
            font-size: 18px;
            margin: 20px 0;
            font-weight: bold;
        }
        .discord-embed button {
            background-color: #ffffff;
            color: #5865F2;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }
        .discord-embed button:after {
            content: '🎉';
            position: absolute;
            top: -30px;
            right: -30px;
            font-size: 24px;
            opacity: 0;
            transition: all 0.3s ease;
        }
        .discord-embed button:hover {
            background-color: #4752C4;
            color: #ffffff;
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }
        .discord-embed button:hover:after {
            top: 5px;
            right: 10px;
            opacity: 1;
            animation: discord-bounce 0.5s infinite alternate;
        }
        @keyframes discord-bounce {
            from { transform: translateY(0); }
            to { transform: translateY(-5px); }
        }
        .discord-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 245 240'%3E%3Cpath d='M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z' fill='%23ffffff'/%3E%3Cpath d='M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z' fill='%23ffffff'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            animation: discord-pulse 2s infinite;
        }
        @keyframes discord-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'discord-overlay';
    overlay.innerHTML = `
        <div class="discord-embed">
            <div class="discord-logo"></div>
            <p>Leaving so soon? Join our Discord community!</p>
            <button>Join Discord</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const button = overlay.querySelector('button');
    button.addEventListener('click', () => window.open(discordInviteLink, '_blank'));

    let leavingDetectionEnabled = false;

    window.addEventListener('load', function() {
        if (!localStorage.getItem('discordOverlayShown')) {
            setTimeout(() => {
                leavingDetectionEnabled = true;
            }, 3000);
        }
    });

    document.addEventListener('mouseleave', function(e) {
        if (leavingDetectionEnabled && e.clientY <= 0) {
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.classList.add('active');
            }, 300);
            localStorage.setItem('discordOverlayShown', 'true');
            leavingDetectionEnabled = false;
        }
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            setTimeout(() => {
                this.style.display = 'none';
            }, 500);
        }
    });
}