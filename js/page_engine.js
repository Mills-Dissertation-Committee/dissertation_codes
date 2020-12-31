// Variable that keeps track of current page layout.
var page_layout = "default";

// The number of divs above in the icon class.
var icons = 6;

// The subject matter of each circle.
var subject = ["resume","research"]

// Open a stylesheet to write in.
document.write("<style>");

// The image in the center circle.
document.write("#circle_center { background: url('./img/2x/me@2x.png'); background-size: 100%; }");

// For loop to create as many icons as listed above.
for(i = 0; i < icons; i++)
{
  document.write("#circle_" + i +
  "{" +
  	"background: url('./img/1x/" + subject[i] + ".png');" +
  	"background-size: 100%;" +
  	"margin-top: 50vh;" +
  	"margin-left: 50vw;" +
  "}" +
  "#circle_" + i + ":hover" +
  "{" +
    "background: url('./img/1x/hover_" + subject[i] + ".png');" +
  	"background-size: 100%;" +
  "}"
  );
}

// Close the stylesheet.
document.write("</style>");

// Create the initial CSS for the icons.
document.write("<div id='circle_center'></div>");
var circle_div = document.getElementById('circle_center');

for(i = 0; i < icons; i++)
{
  document.write("<div id='circle_" + i + "' class='icon'></div>");
}

// Stores the height and width of the page.
var height;
var width;

// Arrays for placing icons.
var icon_rotate = [];
var icon_list = [];
for (i = 0; i < icons; i++)
{
  icon_list[i] = 'circle_' + i;
  icon_rotate[i] = (360 - (i * (360 / icons)) - ((360 / icons) / 2));
}
var icon_left_horizontal = [];
var icon_top_vertical = [];
var icon_spacing = 1 / (icons + 2);
var icon_temp = icon_spacing;
for (i = 0; i < icons; i++)
{
  if (i == Math.round(icons / 2))
  {
    icon_temp = icon_temp + icon_spacing;
  }
  icon_left_horizontal[i] = icon_temp;
  icon_temp = icon_temp + icon_spacing;
}
icon_temp = icon_spacing;
for (i = 0; i < icons; i++)
{
  if (i == Math.round(icons / 2))
  {
    icon_temp = icon_temp + icon_spacing;
  }
  icon_top_vertical[i] = icon_temp;
  icon_temp = icon_temp + icon_spacing;
}

var circle_top = .5;
var circle_left = .5;
var circle_top_horizontal = .55;
var circle_left_horizontal = .5;
var circle_top_vertical = .5;
var circle_left_vertical = .55;
var circle = 'circle_center';
var icon_top_horizontal = .65;
var icon_left_vertical = .55;

var circle_diameter;
var circle_radius;

function set_height_width()
{
  // When the height or width exceeds 2.5x the perpendicular measure, overlapping is prevented.
  if (width > (height * 2.5) || height > (width * 2.5))
  {
    var circle_size = circle_diameter - 20;
    $(eval(circle)).css('height', circle_size + 'px');
    $(eval(circle)).css('width', circle_size + 'px');
    $(".icon").css('height', circle_size + 'px');
    $(".icon").css('width', circle_size + 'px');
  } else
  {
    $(eval(circle)).css('height', circle_diameter + 'px');
    $(eval(circle)).css('width', circle_diameter + 'px');
    $(".icon").css('height', circle_diameter + 'px');
    $(".icon").css('width', circle_diameter + 'px');
  }
}

function set_location()
{
  // When the height or width exceeds 2.5x the perpendicular measure, overlapping is prevented.
  if (width > (height * 2.5))
  {
    var margin_top = circle_top_horizontal * height - circle_radius + 5;
    var margin_left = circle_left_horizontal * width - circle_radius;
    $(eval(circle)).css('margin-top', margin_top + 'px');
    $(eval(circle)).css('margin-left', margin_left + 'px');
    for (i=0;i < icons;i++)
    {
      var margin_top = icon_top_horizontal * height - circle_radius + 5;
      var margin_left = icon_left_horizontal[i] * width - circle_radius;
      $(eval(icon_list[i])).css('margin-top', margin_top + 'px');
      $(eval(icon_list[i])).css('margin-left', margin_left + 'px');
    }
  } else if (height > (width * 2.5))
  {
    var margin_top = circle_top_vertical * height - circle_radius;
    var margin_left = circle_left_vertical * width - circle_radius;
    $(eval(circle)).css('margin-top', margin_top + 'px');
    $(eval(circle)).css('margin-left', margin_left + 'px');
    for (i=0;i < icons;i++)
    {
      var margin_top = icon_top_vertical[i] * height - circle_radius;
      var margin_left = icon_left_vertical * width - circle_radius;
      $(eval(icon_list[i])).css('margin-top', margin_top + 'px');
      $(eval(icon_list[i])).css('margin-left', margin_left + 'px');
    }
  } else
  {
    var margin_top = circle_top * height - circle_radius;
    var margin_left = circle_left * width - circle_radius;
    $(eval(circle)).css('margin-top', margin_top + 'px');
    $(eval(circle)).css('margin-left', margin_left + 'px');
    for (i=0;i < icons;i++)
    {
      var margin_top = (Math.sin(icon_rotate[i] * Math.PI / 180) * (height / 3) - circle_radius) + (height / 2 + 10);
      var margin_left = (Math.cos(icon_rotate[i] * Math.PI / 180) * (width / 3) - circle_radius) + (width / 2);
      $(eval(icon_list[i])).css('margin-top', margin_top + 'px');
      $(eval(icon_list[i])).css('margin-left', margin_left + 'px');
    }
  }
}

function fit_center_circle() {
  // Gets height and width of window.
  height = $(window).height();
  width = $(window).width();

  // Clicking the circle_center div takes the page back to default layout.
  if (page_layout == "circle_center")
  {
    page_layout = "default";
  }

  // Resizes the default page layout.
  if (page_layout == "default")
  {
    // Sets the height and width of the center image and icons based on orientation.
    if (height > width)
    {
      circle_diameter = height / (icons + 1);
      set_height_width();
    } else {
      circle_diameter = width / (icons + 1);
      set_height_width();
    }
    // If the circle_diameter exceeds the screen width, limits size to screen width.
    if (circle_diameter > width)
    {
      circle_diameter = width;
      circle_radius = circle_diameter / 2;
      set_height_width();
      set_location();
    // If the circle_diameter exceeds the screen height, limits size to screen height.
    } else if (circle_diameter > height) {
      circle_diameter = height;
      circle_radius = circle_diameter / 2;
      set_height_width();
      set_location();
    // Image located in center, icons located in four corners.
    } else {
      circle_radius = circle_diameter / 2;
      set_location();
    }
  }
}

// Sets the initial size and location for all elements.
fit_center_circle();

// Listens for icons to be clicked to change click event.
document.addEventListener('click', function(e) {
  if (e.target.id != "background")
  {
    page_layout = e.target.id;
    console.log(page_layout);
  }
}, false);

// Function checks for window resize and adjusts accordingly.
  $(window).resize(function () {
    fit_center_circle();
  });
