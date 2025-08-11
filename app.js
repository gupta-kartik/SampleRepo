// Application state
let selectedTemplate = null;
let currentTab = 'html';

// Template definitions
const templates = {
    modern: {
        name: 'Modern',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Modern</title>
    <link rel="stylesheet" href="login-styles.css">
</head>
<body class="modern-body">
    <div class="login-container">
        <div class="modern-login">
            <div class="logo">
                <div class="logo-icon"></div>
                <h1>Welcome Back</h1>
            </div>
            <form class="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Sign In</button>
            </form>
            <div class="login-footer">
                <a href="#" class="forgot-link">Forgot password?</a>
            </div>
        </div>
    </div>
</body>
</html>`,
        css: `.modern-body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    padding: 20px;
}

.modern-login {
    background: #f8fafc;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: 400px;
}

.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin: 0 auto 15px;
}

.logo h1 {
    color: #1f2937;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #374151;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
}

.login-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.login-btn:hover {
    transform: translateY(-1px);
}

.login-footer {
    text-align: center;
    margin-top: 20px;
}

.forgot-link {
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
}

.forgot-link:hover {
    text-decoration: underline;
}`
    },
    classic: {
        name: 'Classic',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Classic</title>
    <link rel="stylesheet" href="login-styles.css">
</head>
<body class="classic-body">
    <div class="login-container">
        <div class="classic-login">
            <h2>User Login</h2>
            <form class="login-form">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="login-btn">Login</button>
                </div>
            </form>
            <div class="login-footer">
                <p><a href="#" class="link">Forgot Password?</a></p>
            </div>
        </div>
    </div>
</body>
</html>`,
        css: `.classic-body {
    font-family: Arial, sans-serif;
    background: #f0f2f5;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    padding: 20px;
}

.classic-login {
    background: white;
    padding: 40px;
    border: 2px solid #d1d5db;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.classic-login h2 {
    text-align: center;
    color: #374151;
    margin: 0 0 30px 0;
    font-weight: bold;
    font-size: 24px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #374151;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    font-size: 16px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #4f46e5;
}

.login-btn {
    background: #4f46e5;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
}

.login-btn:hover {
    background: #4338ca;
}

.login-footer {
    text-align: center;
    margin-top: 20px;
}

.login-footer p {
    margin: 0;
    color: #6b7280;
}

.link {
    color: #4f46e5;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}`
    },
    gradient: {
        name: 'Gradient',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Gradient</title>
    <link rel="stylesheet" href="login-styles.css">
</head>
<body class="gradient-body">
    <div class="login-container">
        <div class="gradient-login">
            <div class="logo">
                <div class="logo-icon"></div>
                <h2>Sign In</h2>
            </div>
            <form class="login-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Continue</button>
            </form>
            <div class="login-footer">
                <a href="#" class="create-account">Create new account</a>
            </div>
        </div>
    </div>
</body>
</html>`,
        css: `.gradient-body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    padding: 20px;
}

.gradient-login {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 400px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 50%;
    margin: 0 auto 15px;
}

.logo h2 {
    color: #1f2937;
    margin: 0;
    font-size: 28px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #374151;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #6366f1;
    background: rgba(255, 255, 255, 0.9);
}

.login-btn {
    width: 100%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.login-btn:hover {
    transform: translateY(-1px);
}

.login-footer {
    text-align: center;
    margin-top: 20px;
}

.create-account {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
}

.create-account:hover {
    text-decoration: underline;
}`
    },
    dark: {
        name: 'Dark Mode',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Dark</title>
    <link rel="stylesheet" href="login-styles.css">
</head>
<body class="dark-body">
    <div class="login-container">
        <div class="dark-login">
            <div class="logo">
                <div class="logo-icon"></div>
                <h2>Welcome</h2>
            </div>
            <form class="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Sign In</button>
            </form>
            <div class="login-footer">
                <a href="#" class="forgot-password">Reset password</a>
            </div>
        </div>
    </div>
</body>
</html>`,
        css: `.dark-body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #1a1a1a;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container {
    padding: 20px;
}

.dark-login {
    background: #2d2d2d;
    padding: 40px;
    border-radius: 12px;
    border: 1px solid #37374a;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    margin: 0 auto 15px;
}

.logo h2 {
    color: #f9fafb;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #d1d5db;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #37374a;
    border-radius: 8px;
    background: #37374a;
    color: #f9fafb;
    font-size: 16px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #10b981;
}

.login-btn {
    width: 100%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.login-btn:hover {
    transform: translateY(-1px);
}

.login-footer {
    text-align: center;
    margin-top: 20px;
}

.forgot-password {
    color: #10b981;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    text-decoration: underline;
}`
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login Template Generator loaded');
});

// Show template preview
function showPreview(templateType) {
    selectedTemplate = templateType;
    
    // Update selected state
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-template="${templateType}"]`).classList.add('selected');
    
    // Show preview
    const previewFrame = document.getElementById('previewFrame');
    const template = templates[templateType];
    
    if (template) {
        previewFrame.innerHTML = generatePreviewHTML(templateType);
        document.getElementById('generateBtn').disabled = false;
    }
}

// Generate preview HTML
function generatePreviewHTML(templateType) {
    const template = templates[templateType];
    
    // Create a basic preview structure
    let previewHTML = '';
    
    switch(templateType) {
        case 'modern':
            previewHTML = `
                <div class="login-template modern-login">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <h2>Welcome Back</h2>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" readonly>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" readonly>
                    </div>
                    <button class="login-btn" disabled>Sign In</button>
                </div>
            `;
            break;
        case 'classic':
            previewHTML = `
                <div class="login-template classic-login">
                    <h2>User Login</h2>
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" placeholder="Enter username" readonly>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" placeholder="Enter password" readonly>
                    </div>
                    <button class="login-btn" disabled>Login</button>
                </div>
            `;
            break;
        case 'gradient':
            previewHTML = `
                <div class="login-template gradient-login">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <h2>Sign In</h2>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email" readonly>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" readonly>
                    </div>
                    <button class="login-btn" disabled>Continue</button>
                </div>
            `;
            break;
        case 'dark':
            previewHTML = `
                <div class="login-template dark-login">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <h2>Welcome</h2>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" readonly>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" readonly>
                    </div>
                    <button class="login-btn" disabled>Sign In</button>
                </div>
            `;
            break;
    }
    
    return previewHTML;
}

// Generate code for selected template
function generateCode() {
    if (!selectedTemplate) {
        alert('Please select a template first');
        return;
    }
    
    const template = templates[selectedTemplate];
    const codeSection = document.getElementById('codeSection');
    const codeOutput = document.getElementById('codeOutput');
    
    // Show code section
    codeSection.style.display = 'block';
    
    // Set initial code (HTML)
    codeOutput.textContent = template.html;
    
    // Scroll to code section
    codeSection.scrollIntoView({ behavior: 'smooth' });
}

// Show different tabs (HTML/CSS)
function showTab(tabType) {
    if (!selectedTemplate) return;
    
    currentTab = tabType;
    const template = templates[selectedTemplate];
    const codeOutput = document.getElementById('codeOutput');
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update code content
    if (tabType === 'html') {
        codeOutput.textContent = template.html;
    } else if (tabType === 'css') {
        codeOutput.textContent = template.css;
    }
}

// Copy code to clipboard
function copyCode() {
    const codeOutput = document.getElementById('codeOutput');
    const text = codeOutput.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
        // Show feedback
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy code: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const copyBtn = document.querySelector('.btn-copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}