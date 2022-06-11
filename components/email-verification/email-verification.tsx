import React from 'react'
import styles from './email-verification.module.css'

interface EmailVerificationProps {
  link: string
}

const EmailVerification = (props: EmailVerificationProps) => {
  return (
    <div className={styles.paperStyle}>
      <div className={styles.headerContainer}>
        <h2>AHA-TEST</h2>
      </div>
      <div className={styles.contentContainer}>
        <h3>Dear User</h3>
        <p>
          Thank you to sign up for our services. We need to verify your email
          address before you can continue to use our service. Verify your email
          by clicking the button bellow
        </p>
        <div className={styles.midContainer}>
          <div>
            <a href={props.link} target="_blank">
              <p className={styles.buttonStyle}>VERIFY MY EMAIL</p>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.midContainer}>
        <div>
          <p>
            If the button is broken you can copy the link bellow and paste it in
            new tab of your browser
          </p>

          <a href={props.link}>
            <p className={styles.link}>{props.link}</p>
          </a>
        </div>
      </div>
      <div className={styles.footer}>@aha-test 2022</div>
    </div>
  )
}

export default EmailVerification
