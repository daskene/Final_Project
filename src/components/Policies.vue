<template>
    <div class="policy">
        <h1>Content Standards and Community Conduct Policy</h1>
        <p>To ensure a positive and respectful environment for all users, CyberCanvas prohibits the posting of any content that is offensive, graphic, or otherwise inappropriate. This policy applies to all forms of content shared on the platform, including artwork, titles, descriptions, and artist information.</p>

        <h2>Prohibited Content Includes:</h2>
        <ul>
            <li><strong>Graphic or Disturbing Imagery:</strong> Content that is excessively violent, graphic, gory, or disturbing in nature is strictly forbidden.</li>
            <li><strong>Profanity and Offensive Language:</strong> The use of vulgar, obscene, or offensive language in any part of the content, including the title, description, or associated artist information, is not allowed.</li>
            <li><strong>Hate Speech and Discrimination:</strong> Content that promotes hate, discrimination, or harm against individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or any other characteristic is unacceptable.</li>
        </ul>

        <h2>Enforcement and Consequences:</h2>
        <p>Violations of this policy will be taken seriously and may result in immediate removal of the offending content and disciplinary action against the responsible user, up to and including permanent suspension of the account. CyberCanvas reserves the right to determine, at its sole discretion, what constitutes inappropriate content and to take appropriate action.</p>

        <p>By using CyberCanvas, you agree to abide by these content standards and to not post or share any material that violates these guidelines. Our goal is to create a safe and welcoming space for artists and art enthusiasts to share and appreciate creative works.</p>

        <h2>Privacy Policy</h2>
        <h3>Introduction</h3>
        <p>Welcome to our website! We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, store, and safeguard your information.</p>

        <h3>Data Collection</h3>
        <p>We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This information may include your name, email address, phone number, and any other details you provide.</p>

        <h3>Use of Information</h3>
        <p>We use your information to provide, maintain, and improve our services; communicate with you about products, services, offers, and events; process transactions and send related information, including confirmations and invoices; and respond to customer service requests and support needs.</p>

        <h3>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential.</p>

        <h3>Data Security</h3>
        <p>We implement a variety of security measures to maintain the safety of your personal information. Despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

        <h3>Cookies and Tracking Technologies</h3>
        <p>We may use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>

        <h3>Changes to this Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
    </div>
</template>


<script>
    export default {
        name: 'Policies',
        name: 'Header',
        name: 'MyFooter',
    };
</script>



    <style scoped >
    .policy {
        font-family: 'Arial', sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #000; /* Black background */
        color: #fff; /* White text */
        border: 1px solid #333;
        border-radius: 5px;
    }

    .policy h1, .policy h2, .policy h3 {
        color: #fff; /* White text for headings */
    }

    .policy h1 {
        border-bottom: 2px solid #555;
        padding-bottom: 10px;
    }

    .policy h2 {
        color: #ccc; /* Lighter grey for h2 */
        margin-top: 20px;
        border-bottom: 1px solid #444; /* Darker line for separation */
        padding-bottom: 5px;
    }

    .policy p {
        line-height: 1.6;
        color: #ccc; /* Light grey for paragraph text */
    }

    .policy ul {
        margin: 10px 0;
        padding-left: 20px;
    }

    .policy li {
        margin: 5px 0;
    }

    .policy .close {
        float: right;
        font-size: 20px;
        cursor: pointer;
        color: #fff; /* White text for close button */
    }

    .modal-content {
        background-color: #222; /* Dark background for modal content */
        margin: 15px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }

    @media (max-width: 768px) {
        .policy {
            width: 90%;
            padding: 10px;
        }
    }

</style>
