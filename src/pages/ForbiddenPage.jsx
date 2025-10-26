import { useEffect } from "react";

const ForbiddenPage = () => {

    useEffect(() => {
        document.title = "403: Accès non autorisé"
    }, [])

    return <section className="d-flex align-items-center min-vh-100 py-5">
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="text-center text-md-start ">
                    <div className="lc-block mb-3">
                        <div editable="rich">
                            <h1 className="fw-bold h4">ACCÈS NON AUTORISÉ!</h1>
                        </div>
                    </div>
                    <div className="lc-block mb-3">
                        <div editable="rich">
                            <h1 className="display-1 fw-bold text-muted">403</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default ForbiddenPage;