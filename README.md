# Leave-to-discord Integration Guide

A simple way to engage your website visitors by inviting them to join your Discord server. This overlay displays a popup when users attempt to leave the site, prompting them to join your Discord community.

## Quick Start

To add the Discord overlay to your website, follow these simple steps:

1. **Include the Overlay Script**  
   Add the following script tag to your HTML file, just before the closing `</body>` tag:

   ```html
   <script src="https://leave-to-discord.vercel.app/discord-overlay.js"></script>
   ```

2. **Initialize the Overlay**  
   Initialize the overlay with your Discord invite link by adding the following script:

   ```html
   <script>
       initDiscordOverlay('https://discord.gg/your-invite-link');
   </script>
   ```

## Live Demo

Want to see it in action? Move your cursor out of the browser window (towards the top) to trigger the overlay and experience the invite modal.

[**Try the Demo Overlay**](https://leave-to-discord.vercel.app/)

## Customization

You can customize the appearance of the overlay modal by overwriting the CSS in the `discord-overlay.js` file to better fit the design of your website.

**Note:** The overlay will only appear once. To reset it for testing purposes, clear your browser's local storage or use an incognito window.

## Contributing

We welcome contributions! If you'd like to improve this project, please fork the repository and submit a pull request with your enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Created with ❤️ by [Your Name]
