import { useParams } from "react-router-dom";
import { CompanyService } from "../company.service";
import AddAddress from "../address/AddAddress";
import { useQuery } from "react-query"
import ICompanyDetail from "../../../interfaces/CompanyInterfaces"



export default function CompanyDetail() {
    const {id} = useParams();

    const { data, isLoading, error } = useQuery<ICompanyDetail>(['company'], () => CompanyService.getById(id)
    );

   
    if(isLoading) return <p>Загрузка ...</p>

    return (
        <div id="colorlib-blog">
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <div className="blog-wrap">
          <div className="row">
            <div className="col-md-12">
              <img
                className="img-responsive"
                src="/animals2-2.png"
                
                alt="animals2.png"
              />
              <br />
            </div>
            <div className="col-md-12">
              <div className="blog-desc col-paddingbottom">
                <h2>
                  <a href="#">
                    {data?.full_name} 
                  </a>
                </h2>
                <div className="post-meta" style={{ color: "#6f42c1" }}>
                  {data?.address ? 
                  <div> 
                  <span>{data.address.city}</span>
                  <span>{data.address.street}</span>
                  <span>{data.address.house_number}</span>
                  <span>тел 1: {data.address.phone_number1}</span>
                  <span>тел 2: {data.address.phone_number2}</span>
                  </div>
                  : <p>Адрес</p>
                  }
                 
                </div>
                
                <div style={{ color: "#6f42c1" }}>
                
                  <table className="table">
                    <caption style={{ color: "#0d6efd" }}>Работники</caption>
                    <tbody>
                      <tr>
                        <th>Должность</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                      </tr>
                      {data?.employees?.length ? data.employees.map(employee =>(
                        <tr key={employee.id}>
                        <td>{employee.position}</td>
                        <td>{employee.lastname}</td>
                        <td>{employee.firstname}</td>
                        <td>{employee.patronymic}</td>
                      </tr>
                      ))
                      : <tr>
                          <td>Работники</td>
                        </tr>
                      }
                      
                    </tbody>
                  </table>
                </div>
                <div style={{ color: "#6f42c1" }}>
                  <table className="table">
                    <caption style={{ color: "#0d6efd" }}>Животные</caption>
                    <tbody>
                      <tr>
                        <th>Вид животных</th>
                        <th>Пол животных</th>
                        <th>Дата рождения</th>
                        <th>Кличка</th>
                        <th>Идентификация</th>
                        <th />
                      </tr>
                      {data?.animals?.length ? data.animals.map(animal =>(
                      <tr key={animal.id}>
                        <td>{animal.species}</td>
                        <td>{animal.gender}</td>
                        <td>{animal.date_of_birth}</td>
                        <td>{animal.nickname}</td>
                        <td>{animal.identification}</td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <a
                              href="#"
                              className="btn btn-warning btn-sm"
                            >
                              ред
                            </a>
                            <a
                              className="btn btn-danger btn-sm"
                              href="#"
                            >
                              х
                            </a>
                          </div>
                        </td>
                       </tr>
                      ))
                      
                      : <tr>
                          <td>Животные</td>
                         </tr>
                      
                      }
                        
                    </tbody>
                  </table>
                </div>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean. A small river named
                  Duden flows by their place and supplies it with the necessary
                  regelialia.
                </p>
                <p>
                  It is a paradisematic country, in which roasted parts of
                  sentences fly into your mouth. Even the all-powerful Pointing
                  has no control about the blind texts it is an almost
                  unorthographic life One day however a small line of blind text
                  by the name of Lorem Ipsum decided to leave for the far World
                  of Grammar.
                </p>
                <blockquote>
                  The Big Oxmox advised her not to do so, because there were
                  thousands of bad Commas, wild Question Marks and devious
                  Semikoli, but the Little Blind Text didn’t listen. She packed
                  her seven versalia, put her initial into the belt and made
                  herself on the way.
                </blockquote>
                <p>
                  When she reached the first hills of the Italic Mountains, she
                  had a last view back on the skyline of her hometown
                  Bookmarksgrove, the headline of Alphabet Village and the
                  subline of her own road, the Line Lane. Pityful a rethoric
                  question ran over her cheek, then
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="comment-area">
                <h2>3 Comments</h2>
                <div className="row">
                  <div className="comment-wrap">
                    <div className="col-sm-1">
                      <div className="thumbnail">
                        <img
                          className="img-responsive user-photo"
                          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        />
                      </div>
                      {/* /thumbnail */}
                    </div>
                    {/* /col-sm-1 */}
                    <div className="col-sm-11">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <strong>Louie Master</strong>{" "}
                          <span className="text-muted">
                            commented 5 days ago
                          </span>
                        </div>
                        <div className="panel-body">
                          <p>Very Nice Template.. Any Wordpress Version?</p>
                        </div>
                        {/* /panel-body */}
                      </div>
                      {/* /panel panel-default */}
                    </div>
                    {/* /col-sm-5 */}
                  </div>
                  <div className="comment-wrap">
                    <div className="col-sm-1">
                      <div className="thumbnail">
                        <img
                          className="img-responsive user-photo"
                          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        />
                      </div>
                      {/* /thumbnail */}
                    </div>
                    {/* /col-sm-1 */}
                    <div className="col-sm-11">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <strong>Mike Smith</strong>{" "}
                          <span className="text-muted">
                            commented 5 days ago
                          </span>
                        </div>
                        <div className="panel-body">
                          <p>Very Nice Template.. Any Wordpress Version?</p>
                        </div>
                        {/* /panel-body */}
                      </div>
                      {/* /panel panel-default */}
                    </div>
                    {/* /col-sm-5 */}
                  </div>
                  <div className="comment-wrap">
                    <div className="col-sm-1">
                      <div className="thumbnail">
                        <img
                          className="img-responsive user-photo"
                          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        />
                      </div>
                      {/* /thumbnail */}
                    </div>
                    {/* /col-sm-1 */}
                    <div className="col-sm-11">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <strong>John Doe</strong>{" "}
                          <span className="text-muted">
                            commented 5 days ago
                          </span>
                        </div>
                        <div className="panel-body">
                          <p>Very Nice Template.. Any Wordpress Version?</p>
                        </div>
                        {/* /panel-body */}
                      </div>
                      {/* /panel panel-default */}
                    </div>
                    {/* /col-sm-5 */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="comment-area">
                <h2>Leave a comment</h2>
                <form action="#">
                  <div className="row form-group">
                    <div className="col-md-6">
                      {/* <label for="fname">First Name</label> */}
                      <input
                        type="text"
                        id="fname"
                        className="form-control marginbottom"
                        placeholder="Your firstname"
                      />
                    </div>
                    <div className="col-md-6">
                      {/* <label for="lname">Last Name</label> */}
                      <input
                        type="text"
                        id="lname"
                        className="form-control"
                        placeholder="Your lastname"
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      {/* <label for="email">Email</label> */}
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      {/* <label for="message">Message</label> */}
                      <textarea
                        name="message"
                        id="message"
                        cols={30}
                        rows={10}
                        className="form-control"
                        placeholder="Say something about us"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      defaultValue="Post Comment"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <aside className="sidebar">
          <div className="side">
            <h2>Меню</h2>
            <ul className="list">
              <AddAddress companyId={id}/>
              <li>
                <a href="#">
                  Добавить работника <i className="icon-check" />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  Добавить животное <i className="icon-check" />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  Laboratories <i className="icon-check" />{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="side">
            <h2>Recent Posts</h2>
            <div className="post">
              <a href="blog.html">
                {/* <div
                  className="blog-img"
                  style={{
                    backgroundImage:
                      'url({{url_for("static", path="images/blog-1.jpg")}})'
                  }}
                /> */}
                <div className="desc">
                  <span>01 Feb. 2017</span>
                  <h3>
                    Far far away, behind the word mountains, far from the
                    countries
                  </h3>
                </div>
              </a>
            </div>
            <div className="post"></div>
            <div className="post"></div>
          </div>
          <div className="side">
            <h2>
              <span>Para</span>graph
            </h2>
            <p>
              The Big Oxmox advised her not to do so, because there were
              thousands of bad Commas, wild Question Marks and devious Semikoli,
              but the Little Blind Text didn’t listen.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</div>

    )
}