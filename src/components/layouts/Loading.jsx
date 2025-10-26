import { createPortal } from "react-dom";
import Lottie from "react-lottie-player";
import animationData from '../../assets/lotties/loading-driver.json'

export default function Loading() {
    return createPortal(
        <div className="modal-loading-container">
            <div className="modal-loading-content">
                <Lottie
                     animationData={animationData}
                     style={{ background: "transparent", height: "100%" }}
                     loop
                     play
                />
            </div>
        </div>,
        document.body
    );
}