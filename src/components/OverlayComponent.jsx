import { useAppStore } from '~/store/useAppStore';

const OverlayComponent = () => {
    const { isOverlayVisible, setOverlayVisible } = useAppStore();

    // if (!isOverlayVisible) return null; // Nếu không cần overlay thì không render gì cả

    return (
        <div
            onClick={() => setOverlayVisible(false)} // Click để tắt overlay
            className="fixed  left-0 w-screen h-screen bg-black/30 z-10 top-0"
        />
    );
};

export default OverlayComponent;
