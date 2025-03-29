'use client'; // Add this line to mark this component as a client component

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import styles from './Email.module.css';
// import { useToast } from "@/components/ui/use-toast"

export default function VerifyEmail() {
    const [status, setStatus] = useState("null");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    // const { toast } = useToast();

    useEffect(() => {
        // Ensure router.query is available and not an empty object.
        verify();

        async function verify() {
            const token = params.token;
            if (token) {
                try {
                    // Call the API to verify the token
                    await axios.get(process.env.NEXT_PUBLIC_SERVER_DOMAIN + `/api/v1/users/verify-email?token=${token}`);
                    setStatus('Success');
                    setLoading(false);

                    // Redirect to the login page after 10 seconds
                    setTimeout(() => {
                        router.push("/login");
                    }, 5000); // 10000ms = 10 seconds
                } catch (err) {
                    setStatus('Failed');
                    console.log(err);
                    setLoading(false);
                }
            }
        }

    }, [params, router]);

    if (loading) {
        return (
            <div className={styles.container}>
                <p className={styles.message}>Loading...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Email Verification Status</h1>
            {status === 'Success' ? (
                <p className={styles.message}>
                    Your email has been successfully verified!
                </p>
            ) : (
                <p className={styles.message}>
                    Verification failed. Please try again.
                </p>
            )}
        </div>
    );
}
