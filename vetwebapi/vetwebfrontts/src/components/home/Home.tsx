
export default function Home() {
    return (  

                <div id="page">
                 
                <div id="colorlib-blog">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-6 col-md-offset-3 text-center colorlib-heading">
                            <img
                                className="img-responsive"
                                src="/animals.png"

                                alt="animals.png"
                            />
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
               
       )
}