
export default function Home() {
    return (  
        <>
            <div className="colorlib-loader" />
            <div id="page">
                <aside id="colorlib-hero">
                    <div className="flexslider">
                        <ul className="slides">
                            <li
                                style={{ backgroundImage: 'url("/animals.png")' }}
                            >
                                <div className="overlay" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 col-md-pull-2 slider-text">
                                            <div className="slider-text-inner">
                                                <h1>
                                                    <strong>Владельцы животных</strong>
                                                </h1>
                                                <h2 className="doc-holder">
                                                    Регистрация владельцев животных.
                                                </h2>
                                                <p>
                                                    <a
                                                        className="btn btn-primary btn-lg"
                                                        href="{{url_for('companies')}}"
                                                    >
                                                        Перейти
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                style={{ backgroundImage: 'url("/img_bg_1.jpg")' }}
                            >
                                <div className="overlay" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 col-md-pull-2 slider-text">
                                            <div className="slider-text-inner">
                                                <h1>
                                                    <strong> Противоэпизоотическая работа</strong>
                                                </h1>
                                                <h2 className="doc-holder">
                                                    Учет и отчетность противоэпизоотических мероприятий
                                                </h2>
                                                <h2 />
                                                <p>
                                                    <a
                                                        className="btn btn-primary btn-lg"
                                                        href="appointment.html"
                                                    >
                                                        Перейти
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                style={{ backgroundImage: 'url("../static/images/medicals.png")' }}
                            >
                                <div className="overlay" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 col-md-pull-2 slider-text">
                                            <div className="slider-text-inner">
                                                <h1>
                                                    <strong>Биопрепараты</strong>
                                                </h1>
                                                <h2>Учет и отчетность по биологическим препаратам</h2>
                                                <p>
                                                    <a
                                                        className="btn btn-primary btn-lg btn-learn"
                                                        href="appointment.html"
                                                    >
                                                        Перейти
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                style={{ backgroundImage: 'url("/img_bg_2.jpg")' }}
                            >
                                <div className="overlay" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 col-md-pull-2 slider-text">
                                            <div className="slider-text-inner">
                                                <h1>
                                                    Special offer! <strong>Free Consultation</strong> this
                                                    month only
                                                </h1>
                                                <h2>
                                                    Separated they live in Bookmarksgrove right at the coast
                                                    of the Semantics, a large language ocean.
                                                </h2>
                                                <p>
                                                    <a
                                                        className="btn btn-primary btn-lg btn-learn"
                                                        href="appointment.html"
                                                    >
                                                        Make an Appointment
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div id="colorlib-intro">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="intro animate-box">
                                    <div className="intro-grid color-1">
                                        <span className="icon">
                                            <i className="flaticon-hospital" />
                                        </span>
                                        <h3>Medical Counseling</h3>
                                        <p>
                                            Far far away, behind the word mountains, far from the
                                            countries Vokalia
                                        </p>
                                        <a href="#">Read more</a>
                                    </div>
                                    <div className="intro-grid color-2">
                                        <span className="icon">
                                            <i className="flaticon-healthy-1" />
                                        </span>
                                        <h3>Qualified Doctors</h3>
                                        <p>
                                            Far far away, behind the word mountains, far from the
                                            countries Vokalia
                                        </p>
                                        <a href="#">Read more</a>
                                    </div>
                                    <div className="intro-grid color-2">
                                        <span className="icon">
                                            <i className="flaticon-sign" />
                                        </span>
                                        <h3>Rehabilitation Center</h3>
                                        <p>
                                            Far far away, behind the word mountains, far from the
                                            countries Vokalia
                                        </p>
                                        <a href="#">Read more</a>
                                    </div>
                                    <div className="intro-grid color-3">
                                        <span className="icon">
                                            <i className="flaticon-ambulance" />
                                        </span>
                                        <h3>Emergency Services</h3>
                                        <p>
                                            Far far away, behind the word mountains, far from the
                                            countries Vokalia
                                        </p>
                                        <a href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-about">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    className="img-responsive about-img"
                                    src="{{url_for('static', path='/images/about.jpg')}}"
                                    alt=""
                                />
                            </div>
                            <div className="col-md-7 col-md-push-1">
                                <h2>About Medicare</h2>
                                <p>
                                    Far far away, behind the word mountains, far from the countries
                                    Vokalia and Consonantia, there live the blind texts.
                                </p>
                                <div className="fancy-collapse-panel">
                                    <div
                                        className="panel-group"
                                        id="accordion"
                                        role="tablist"
                                        aria-multiselectable="true"
                                    >
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingOne">
                                                <h4 className="panel-title">
                                                    <a
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseOne"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Why choose us?
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className="panel-collapse collapse in"
                                                role="tabpanel"
                                                aria-labelledby="headingOne"
                                            >
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p>
                                                                Far far away, behind the word mountains, far from
                                                                the countries Vokalia and Consonantia, there live
                                                                the blind texts.{" "}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p>
                                                                Separated they live in Bookmarksgrove right at the
                                                                coast of the Semantics, a large language ocean.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                <h4 className="panel-title">
                                                    <a
                                                        className="collapsed"
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo"
                                                    >
                                                        What we do?
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="panel-collapse collapse"
                                                role="tabpanel"
                                                aria-labelledby="headingTwo"
                                            >
                                                <div className="panel-body">
                                                    <p>
                                                        Far far away, behind the word <strong>mountains</strong>
                                                        , far from the countries Vokalia and Consonantia, there
                                                        live the blind texts. Separated they live in
                                                        Bookmarksgrove right at the coast of the Semantics, a
                                                        large language ocean.
                                                    </p>
                                                    <ul>
                                                        <li>Separated they live in Bookmarksgrove right</li>
                                                        <li>Separated they live in Bookmarksgrove right</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingThree">
                                                <h4 className="panel-title">
                                                    <a
                                                        className="collapsed"
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseThree"
                                                        aria-expanded="false"
                                                        aria-controls="collapseThree"
                                                    >
                                                        Offer Services
                                                    </a>
                                                </h4>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                className="panel-collapse collapse"
                                                role="tabpanel"
                                                aria-labelledby="headingThree"
                                            >
                                                <div className="panel-body">
                                                    <p>
                                                        Far far away, behind the word <strong>mountains</strong>
                                                        , far from the countries Vokalia and Consonantia, there
                                                        live the blind texts. Separated they live in
                                                        Bookmarksgrove right at the coast of the Semantics, a
                                                        large language ocean.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-appointment">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 text-center">
                                <h2 className="line-block">Make an appointment</h2>
                                <p className="line-block">
                                    <a href="#" className="btn btn-primary btn-outline btn-cta">
                                        Book an Appointment <i className="icon-calendar3" />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-services">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                                <h2>Our Services</h2>
                                <p>
                                    A small river named Duden flows by their place and supplies it
                                    with the necessary regelialia.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-healthy-1" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Qualified Doctors</a>
                                        </h3>
                                        <p>
                                            The Big Oxmox advised her not to do so, because there were
                                            thousands of bad Commas, wild Question Marks and devious
                                            Semikoli
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-hospital" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Medical Counseling</a>
                                        </h3>
                                        <p>
                                            Little Blind Text didn’t listen. She packed her seven
                                            versalia, put her initial into the belt and made herself on
                                            the way.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-ambulance" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Emergency Services</a>
                                        </h3>
                                        <p>
                                            The Big Oxmox advised her not to do so, because there were
                                            thousands of bad Commas, wild Question Marks and devious
                                            Semikoli
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-blood-donation" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Blood Bank</a>
                                        </h3>
                                        <p>
                                            The Big Oxmox advised her not to do so, because there were
                                            thousands of bad Commas, wild Question Marks and devious
                                            Semikoli
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-radiation" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Operation Theater</a>
                                        </h3>
                                        <p>
                                            Little Blind Text didn’t listen. She packed her seven
                                            versalia, put her initial into the belt and made herself on
                                            the way.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 animate-box">
                                <div className="services">
                                    <span className="icon">
                                        <i className="flaticon-medical" />
                                    </span>
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Free Medicine</a>
                                        </h3>
                                        <p>
                                            The Big Oxmox advised her not to do so, because there were
                                            thousands of bad Commas, wild Question Marks and devious
                                            Semikoli
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-choose">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="choose">
                                <div
                                    className="half img-bg"
                                    style={{
                                        backgroundImage: 'url("../static/images/img_bg_3.jpg")'
                                    }}
                                />
                                <div className="half features-wrap">
                                    <div className="colorlib-heading animate-box">
                                        <h2>What Makes Us Best?</h2>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="features animate-box">
                                                <span className="icon text-center">
                                                    <i className="flaticon-healthy-1" />
                                                </span>
                                                <div className="desc">
                                                    <h3>Qualified Doctors</h3>
                                                    <p>
                                                        A small river named Duden flows by their place and
                                                        supplies it with the necessary regelialia.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="features animate-box">
                                                <span className="icon text-center">
                                                    <i className="flaticon-stethoscope" />
                                                </span>
                                                <div className="desc">
                                                    <h3>Free Consultation</h3>
                                                    <p>
                                                        A small river named Duden flows by their place and
                                                        supplies it with the necessary regelialia.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="features animate-box">
                                                <span className="icon text-center">
                                                    <i className="flaticon-medical-1" />
                                                </span>
                                                <div className="desc">
                                                    <h3>Online Enrollment</h3>
                                                    <p>
                                                        A small river named Duden flows by their place and
                                                        supplies it with the necessary regelialia.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="features animate-box">
                                                <span className="icon text-center">
                                                    <i className="flaticon-radiation" />
                                                </span>
                                                <div className="desc">
                                                    <h3>Modern Facilities</h3>
                                                    <p>
                                                        A small river named Duden flows by their place and
                                                        supplies it with the necessary regelialia.{" "}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-doctor">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                                <h2>Well Experienced Doctors</h2>
                                <p>
                                    A small river named Duden flows by their place and supplies it
                                    with the necessary regelialia.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12 animate-box text-center">
                                <div className="doctor">
                                    <div
                                        className="staff-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/staff-4.jpg")'
                                        }}
                                    />
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Dr. Beatrice Prior</a>
                                        </h3>
                                        <span>Dental Hygienist</span>
                                        <ul className="colorlib-social">
                                            <li>
                                                <a href="#">
                                                    <i className="icon-facebook2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-twitter2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-linkedin2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 animate-box text-center">
                                <div className="doctor">
                                    <div
                                        className="staff-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/staff-2.jpg")'
                                        }}
                                    />
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Dr. Edward Dughlas</a>
                                        </h3>
                                        <span>Orthopedic Surgeon</span>
                                        <ul className="colorlib-social">
                                            <li>
                                                <a href="#">
                                                    <i className="icon-facebook2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-twitter2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-linkedin2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 animate-box text-center">
                                <div className="doctor">
                                    <div
                                        className="staff-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/staff-3.jpg")'
                                        }}
                                    />
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Dr. Peter Parker</a>
                                        </h3>
                                        <span>Health Care</span>
                                        <ul className="colorlib-social">
                                            <li>
                                                <a href="#">
                                                    <i className="icon-facebook2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-twitter2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-linkedin2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 animate-box text-center">
                                <div className="doctor">
                                    <div
                                        className="staff-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/staff-1.jpg")'
                                        }}
                                    />
                                    <div className="desc">
                                        <h3>
                                            <a href="#">Dr. Liza Thomas</a>
                                        </h3>
                                        <span>Patient Services Manager</span>
                                        <ul className="colorlib-social">
                                            <li>
                                                <a href="#">
                                                    <i className="icon-facebook2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-twitter2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-linkedin2" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="icon-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="colorlib-counter"
                    className="colorlib-counters"
                    style={{ backgroundImage: 'url("../static/images/img_bg_2.jpg")' }}
                    data-stellar-background-ratio="0.5"
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="row">
                                    <div className="col-md-3 col-sm-6 text-center animate-box">
                                        <span className="icon">
                                            <i className="flaticon-healthy" />
                                        </span>
                                        <span
                                            className="colorlib-counter js-counter"
                                            data-from={0}
                                            data-to={3297}
                                            data-speed={5000}
                                            data-refresh-interval={50}
                                        />
                                        <span className="colorlib-counter-label">
                                            Satisfied Customer
                                        </span>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center animate-box">
                                        <span className="icon">
                                            <i className="flaticon-hospital" />
                                        </span>
                                        <span
                                            className="colorlib-counter js-counter"
                                            data-from={0}
                                            data-to={378}
                                            data-speed={5000}
                                            data-refresh-interval={50}
                                        />
                                        <span className="colorlib-counter-label">Hospitals</span>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center animate-box">
                                        <span className="icon">
                                            <i className="flaticon-healthy-1" />
                                        </span>
                                        <span
                                            className="colorlib-counter js-counter"
                                            data-from={0}
                                            data-to={400}
                                            data-speed={5000}
                                            data-refresh-interval={50}
                                        />
                                        <span className="colorlib-counter-label">Qualified Doctor</span>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center animate-box">
                                        <span className="icon">
                                            <i className="flaticon-ambulance" />
                                        </span>
                                        <span
                                            className="colorlib-counter js-counter"
                                            data-from={0}
                                            data-to={30}
                                            data-speed={5000}
                                            data-refresh-interval={50}
                                        />
                                        <span className="colorlib-counter-label">Departments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="colorlib-blog">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                                <h2>Recent blog</h2>
                                <p>
                                    Dignissimos asperiores vitae velit veniam totam fuga molestias
                                    accusamus alias autem provident. Odit ab aliquam dolor eius.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="blog-entry">
                                    <a
                                        href="blog.html"
                                        className="blog-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/blog-1.jpg")'
                                        }}
                                    >
                                        <p className="date">
                                            <span>1</span>
                                            <span>Feb. 2017</span>
                                        </p>
                                    </a>
                                    <div className="desc">
                                        <h3>
                                            <a href="blog.html">
                                                Here's why yoga is best for your health
                                            </a>
                                        </h3>
                                        <p>
                                            A small river named Duden flows by their place and supplies it
                                            with the necessary regelialia.
                                        </p>
                                        <p>
                                            <a href="#">
                                                Read more <i className="icon-arrow-right3" />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="blog-entry">
                                    <a
                                        href="blog.html"
                                        className="blog-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/blog-2.jpg")'
                                        }}
                                    >
                                        <p className="date">
                                            <span>31</span>
                                            <span>Jan. 2017</span>
                                        </p>
                                    </a>
                                    <div className="desc">
                                        <h3>
                                            <a href="blog.html">
                                                live better get to know your medical technology
                                            </a>
                                        </h3>
                                        <p>
                                            A small river named Duden flows by their place and supplies it
                                            with the necessary regelialia.
                                        </p>
                                        <p>
                                            <a href="#">
                                                Read more <i className="icon-arrow-right3" />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="blog-entry">
                                    <a
                                        href="blog.html"
                                        className="blog-img"
                                        style={{
                                            backgroundImage: 'url("../static/images/blog-3.jpg")'
                                        }}
                                    >
                                        <p className="date">
                                            <span>30</span>
                                            <span>Jan. 2017</span>
                                        </p>
                                    </a>
                                    <div className="desc">
                                        <h3>
                                            <a href="blog.html">Eating apple is the source of energy</a>
                                        </h3>
                                        <p>
                                            A small river named Duden flows by their place and supplies it
                                            with the necessary regelialia.
                                        </p>
                                        <p>
                                            <a href="#">
                                                Read more <i className="icon-arrow-right3" />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

               
       )
}