import {useState} from "react";

export default function useOverlay() {
    const [overlayOpen, setOverlayOpen] = useState<boolean>(false);
    const closeOverlay = () => void setOverlayOpen(false)
    const openOverlay = () => void setOverlayOpen(true)

    return {closeOverlay, openOverlay, overlayOpen}
}
