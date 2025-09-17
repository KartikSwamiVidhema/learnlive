import { useState } from 'react';
import { useRouter } from 'next/router';

const demoform = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Example POST request to your backend API to save the form data
        try {
            const response = await fetch('/api/demo-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Demo request submitted successfully!');
                router.push('/thank-you'); // Redirect or show success message
            } else {
                alert('Failed to submit demo request.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Try again later.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <h1 className="text-xl font-bold mb-4">Please Enter Your Details Below</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default demoform;