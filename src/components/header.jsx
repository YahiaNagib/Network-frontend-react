import React from "react";

function Header() {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Network</a>
          
            <div class="ml-auto">
              <ul class="navbar-nav ml-auto">
                {/* {% if user.is_authenticated %} */}
                    <li class="nav-item">
                        <a class="nav-link" href="#"><strong>Yahia</strong></a>
                    </li>
                {/* {% endif %} */}
                <li class="nav-item">
                  <a class="nav-link" href="#">All Posts</a>
                </li>
                {/* {% if user.is_authenticated %} */}
                    <li class="nav-item">
                        <a class="nav-link" href="#">Following</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Log Out</a>
                    </li>
                {/* {% else %}
                    <li class="nav-item">
                        <a class="nav-link" href="#">Log In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Register</a>
                    </li>
                {% endif %} */}
              </ul>
            </div>
          </nav>
    </header>
  );
}

export default Header;
