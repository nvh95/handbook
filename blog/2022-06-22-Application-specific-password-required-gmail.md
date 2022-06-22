---
slug: application-specific-password-required-gmail
title: Error Application-specific password required
authors: [nvh95]
tags: [error, gmail]
---

If you want to add an alias to send an email from a different email address. You might end up following this tutorial:

- https://support.google.com/mail/answer/22370?hl=en

But you might encounter this issue: [AUTH] Application-specific password required.

This issue happens if you setup Two factor authentication (which you should) for the other email. In this case, you need to follow this tutorial:

- https://support.google.com/domains/answer/9437157?hl=en

The idea is you need to create an app password then use the app password to authenticate, instead of using the password directly.

I just copy the content in case of the above link is not accessible, or you just don't want to visit it 😂.

**Step 1: Generate your app password**

1. On your computer, go to your Google Account.
1. At the left, click Security.
1. Under "Signing in to Google," click App passwords and sign in, if required.
   If you don't find "App passwords," click 2-Step Verification and follow the steps to turn on 2-step verification 1. for your account. You may have to sign in again.
1. Under “App passwords,” click Select app and then Mail.
1. Click Select device and then Other.
1. Enter the name of your domain and click Generate.
1. From the app password box, copy the 16 character password generated. You'll need this address when you add your new send-as (forwarded) account (in Step 2 below).

**Step 2: Add an email alias**

1. On your computer, go to [Gmail](Gmail).
1. At the top right, click Settings => Settings.
1. Select the Accounts and import or Accounts tab.
1. In the "Send mail as," click Add another email address.
1. In the window that opens, enter the name you want recipients to view.
1. Enter the email address alias you’ve set up for email forwarding.
1. Confirm that "Treat as an alias" is marked, and click Next step.
1. In the "SMTP Server" field, enter: `smtp.gmail.com`.
1. From the "Port" menu, choose **587**.
1. In the "Username" field, enter the username you're signed in with.
1. In the "Password" field, enter the 16-character generated app password that you copied in Step 1.
1. Confirm that the Secured connection using TLS box is marked.
1. Click Add account.
   ​

**Step 3: Confirm the address**

1. On your computer, go to Gmail.
1. Open the confirmation message you received from Gmail.
1. Click the link.

I hope this note helps you save some time. Thanks
