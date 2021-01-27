
// navbar scroll
$(function () {
  $(window).on('scroll', function () {
      if ( $(window).scrollTop() > 100 ) {
          $('.navbar').addClass('active');
      } else {
          $('.navbar').removeClass('active');
      }
  });
});


// navbar scrolls to the right section
var divId;

$(".nav-link").click(function () {
  divId = $(this).attr("href");
  $("html, body").animate(
    {
      scrollTop: $(divId).offset().top - 70,
    },
    100
  );
});



// typing on main section
var typewriter = function(txt) {
  var container = document.getElementById('typewriter'),
    speed = 50,
    i = 0,
    wordsObj = txt.split(" ")
  container.textContent = "";
  console.log(txt)
  runAllWords();
  function runAllWords() {

    if (i < wordsObj.length) {
      var a = (i == 0) ? i : i - 1;
      setTimeout(function() {
        showWord(wordsObj[i], 0)
      }, wordsObj[a].length * speed);
    }
  }

  function showWord(word, countWord) {
    if (countWord < word.length) {
      setTimeout(function() {
        showLetter(word, countWord)
      }, speed);
    } else {
      container.textContent = container.textContent + " ";
      i += 1;
      runAllWords();
    }
    if (i === wordsObj.length) {
      console.log('complete')
    }
  }

  function showLetter(word, countWord) {
    container.textContent = container.textContent + word[countWord];
    showWord(word, countWord + 1);
  }
}
// window.onload = typewriter();
// var container = document.getElementById('typewriter'),
//   dataText = container.dataset.typewriter,
//   splitTxt = dataText.split(",")
// for (var x = 0, ln = splitTxt.length; x < ln; x++) {
//   setTimeout(typewriter(splitTxt[x]), x * 1000, x);
// }


var i = 0;
function myLoop () {  
//  create a loop function

 var dataType = document.getElementById('typewriter').dataset.typewriter,
     w = dataType.split(',')
 setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    typewriter(w[i]);          //  your code here
    i++;                     //  increment the counter
    if (i < w.length) {            //  if the counter < 10, call the loop function
       myLoop();             //  ..  again which will trigger another 
    }                        //  ..  setTimeout()
 }, 3000)
}

myLoop();




// skills part - progress bar
$(document).ready(function ($) {
  function animateElements() {
      $('.progressbar').each(function () {
          var elementPos = $(this).offset().top;
          var topOfWindow = $(window).scrollTop();
          var percent = $(this).find('.circle').attr('data-percent');
          var animate = $(this).data('animate');
          if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
              $(this).data('animate', true);
              $(this).find('.circle').circleProgress({
                  // startAngle: -Math.PI / 2,
                  value: percent / 100,
                  size : 400,
                  thickness: 15,
                  fill: {
                      color: '#663399'
                  }
              }).on('circle-animation-progress', function (event, progress, stepValue) {
                  $(this).find('strong').text((stepValue*100).toFixed(0) + "%");
              }).stop();
          }
      });
  }

  animateElements();
  $(window).scroll(animateElements);
});


document.addEventListener("DOMContentLoaded", function() {

  var circleProgress = (function(selector) {
    var wrapper = document.querySelectorAll(selector);
    Array.prototype.forEach.call(wrapper, function(wrapper, i) {
      var wrapperWidth,
        wrapperHeight,
        percent,
        innerHTML,
        context,
        lineWidth,
        centerX,
        centerY,
        radius,
        newPercent,
        speed,
        from,
        to,
        duration,
        start,
        strokeStyle,
        text;

      var getValues = function() {
        wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
        wrapperHeight = wrapperWidth;
        percent = wrapper.getAttribute('data-cp-percentage');
        innerHTML = '<span class="percentage"><strong>' + percent + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
        wrapper.innerHTML = innerHTML;
        text = wrapper.querySelector(".percentage");
        canvas = wrapper.querySelector(".circleProgressCanvas");
        wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        newPercent = 0;
        speed = 1;
        from = 0;
        to = percent;
        duration = 1000;
        lineWidth = 25;
        radius = canvas.width / 2 - lineWidth;
        strokeStyle = wrapper.getAttribute('data-cp-color');
        start = new Date().getTime();
      };

      function animate() {
        requestAnimationFrame(animate);
        var time = new Date().getTime() - start;
        if (time <= duration) {
          var x = easeInOutQuart(time, from, to - from, duration);
          newPercent = x;
          text.innerHTML = Math.round(newPercent) + " %";
          drawArc();
        }
      }

      function drawArc() {
        var circleStart = 1.5 * Math.PI;
        var circleEnd = circleStart + (newPercent / 50) * Math.PI;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = "#ddd";
        context.stroke();
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();

      }
      var update = function() {
        getValues();
        animate();
      }
      update();

      var btnUpdate = document.querySelectorAll(".btn-update")[0];
      btnUpdate.addEventListener("click", function() {
        wrapper.setAttribute("data-cp-percentage", Math.round(getRandom(5, 95)));
        update();
      });
      wrapper.addEventListener("click", function() {
        update();
      });

      var resizeTimer;
      window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          clearTimeout(resizeTimer);
          start = new Date().getTime();
          update();
        }, 250);
      });
    });


    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

  });

  circleProgress('.counter');

  // Gibt eine Zufallszahl zwischen min (inklusive) und max (exklusive) zurück
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
});



// time

