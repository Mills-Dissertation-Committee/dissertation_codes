// Boolean variable that keeps track of current page layout.
var page_layout = false;

// The center circle and four icon circles.
var circle_div = document.getElementById('circle_center');
var circle_one = document.getElementById('circle_one');
var circle_two = document.getElementById('circle_two');
var circle_three = document.getElementById('circle_three');
var circle_four = document.getElementById('circle_four');

// The number of divs above in the icon class.
var icons = 4;

// Stores the height and width of the page.
var height;
var width;

// Array for placing icons.
var icon_rotate = [];
for (i = 0; i < icons; i++)
{
  icon_rotate[i] = (360 - (i * (360 / icons)) - ((360 / icons) / 2));
}

var circle_top = .5;
var circle_left = .5;
var circle_top_horizontal = .55;
var circle_left_horizontal = .5;
var circle_top_vertical = .5;
var circle_left_vertical = .55;
var circle = 'circle_center';
var icon_top_horizontal = [.65, .65, .65, .65];
var icon_left_horizontal = [.1, .3, .7, .9];
var icon_top_vertical = [.125, .325, .7, .9];
var icon_left_vertical = [.55, .55, .55, .55];
var icon_list = ['circle_one','circle_two','circle_three','circle_four'];

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
      var margin_top = icon_top_horizontal[i] * height - circle_radius + 5;
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
      var margin_left = icon_left_vertical[i] * width - circle_radius;
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

function fit_center_circle(div,div_one,div_two,div_three,div_four) {
  // Gets height and width of window.
  height = $(window).height();
  width = $(window).width();

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

// Sets the initial size and location for all elements.
fit_center_circle(circle_div,circle_one,circle_two,circle_three,circle_four);

// Function checks for window resize and adjusts accordingly.
$(window).resize(function () {
  fit_center_circle(circle_div,circle_one,circle_two,circle_three,circle_four);
});
