import { useEffect } from "react";

const NotFoundPage = () => {

    useEffect(() => {
        document.title = "404: Page non trouvée"
    }, [])

    return <section className="d-flex align-items-center min-vh-100 py-5">
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="text-center text-md-start ">
                    <div className="lc-block mb-3">
                        <div editable="rich">
                            <h1 className="fw-bold h4">PAGE NON TROUVÉE!</h1>
                        </div>
                    </div>
                    <div className="lc-block mb-3">
                        <div editable="rich">
                            <h1 className="display-1 fw-bold text-muted">404</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default NotFoundPage;