import React from "react";

function Post(props) {
  const { user, date, content, likes } = props.post;

  const renderLike = () => {


  };
  return (
    <div className="post">
            <div className="post-owner">
                <h2 className="post-username"> <a className="post-username" href="#">{user.name}</a></h2>
                <p className="user-email">{user.email}</p>
                <p className="post-date">{date}</p>
            </div>
            {/* {% if user == post.user %}
                <button class="btn btn-link edit-btn">Edit</button>
                <form class="edit-form" action="{% url 'save-post' %}" method="POST">
                    <input name="id" value="{{post.id}}" hidden>
                    <textarea name="content" cols="50" rows="5" class="form-control mb-3 post-content-area" required>{{post.content}}</textarea>
                    <input type="submit" value="Edit" class="btn btn-primary submit-btn">
                </form>
            {% endif %} */}
            
            <p className="post-content">{content}</p>

            <p className="post-like">
                {/* <input class="post-id" name="id" value="{{post.id}}" hidden/>

                {% if not user.is_authenticated %}
                    <i class="far fa-heart"></i>
                {% else %}
                    {%if user in post.likes.all%}
                        <i class="fas fa-heart like-icon liked"></i>
                    {%else%}
                        <i class="far fa-heart like-icon"></i>
                    {%endif%}
                {% endif %} */}


                <span className="post-likes-number"></span>
            </p>
        </div>
  );
}

export default Post;
