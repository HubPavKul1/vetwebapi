export default function Companies() {
    return (
        <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                        <h2>Предприятия</h2>
                        <p>
                            <a
                                className="btn btn-primary btn-lg"
                                href="#"
                            >
                                Добавить предприятие
                            </a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    {/* {"{"}% if companies %{"}"}
                    {"{"}% for company in companies %{"}"} */}
                    {/* <div className="col-md-4 animate-box">
                        <div className="services">
                            <span className="icon">
                                <i className="flaticon-healthy-1" />
                            </span>
                            <div className="desc">
                                <h3>
                                    <a href="#">
                                       
                                    </a>
                                </h3>
                                <p>
                                    The Big Oxmox advised her not to do so, because there were
                                    thousands of bad Commas, wild Question Marks and devious Semikoli
                                </p>
                            </div>
                        </div>
                    </div> */}
                    
                    <div className="col-md-4 animate-box">
                        <div className="services">
                            <span className="icon">
                                <i className="flaticon-healthy-1" />
                            </span>
                            <div className="desc">
                                <h3>
                                    <a href="">No Companies</a>
                                </h3>
                                <p>
                                    The Big Oxmox advised her not to do so, because there were
                                    thousands of bad Commas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}