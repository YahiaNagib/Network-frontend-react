import React from "react";

function Post(props) {
  const { user, date, content, likes } = props.post;

  const renderLike = () => {


  };
  return (
    <div class="post">
            <div class="post-owner">
                <h2 class="post-username"> <a class="post-username" href="#">{user.name}</a></h2>
                <p class="user-email">{user.email}</p>
                <p class="post-date">{date}</p>
            </div>
            {/* {% if user == post.user %}
                <button class="btn btn-link edit-btn">Edit</button>
                <form class="edit-form" action="{% url 'save-post' %}" method="POST">
                    <input name="id" value="{{post.id}}" hidden>
                    <textarea name="content" cols="50" rows="5" class="form-control mb-3 post-content-area" required>{{post.content}}</textarea>
                    <input type="submit" value="Edit" class="btn btn-primary submit-btn">
                </form>
            {% endif %} */}
            
            <p class="post-content">{content}</p>

            <p class="post-like">
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


                <span class="post-likes-number"></span>
            </p>
        </div>
  );
}

export default Post;
