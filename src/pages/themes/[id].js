import { useRouter } from 'next/router';

const ThemesPage = () => {
    const router = useRouter();
    const { id } = router.query; // Extracts 'id1', 'id2', etc. from URL

    // Simple message mapping (you can expand this)
    const getMessage = (id) => {
        switch (id) {
            case 'id1':
                return 'Welcome in Ithemes we are in id1';
            case 'id2':
                return 'Welcome in Ithemes we are in id2';
            case 'id3':
                return 'Welcome in Ithemes we are in id3';
            default:
                return 'Page not found for this ID';
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>{getMessage(id)}</h1>
            <button onClick={() => router.back()}>Go Back</button>
        </div>
    );
};

export default ThemesPage;