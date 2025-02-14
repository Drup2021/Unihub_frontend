JWT Authenticated [Highly advanced implementation]

1. HTTP-only cookies for refresh tokens: To Prevent token theft via JavaScript or XSS. [Cross-Site Scripting (XSS)]
2. Secure attribute for cookies: Ensured tokens are only sent over HTTPS.
3. SameSite attribute: Mitigate CSRF attacks. [Cross-Site Request Forgery (CSRF)]
4. Short-lived access tokens: Limiting the window of misuse if a token is stolen.
5. Blacklist support
