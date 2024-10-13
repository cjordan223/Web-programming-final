// modal js

$(document).ready(function() {
  $('.variant-link').click(function(e) {
    e.preventDefault();
     const variantData = JSON.parse($(this).attr('data-variant'));

     let modalContent = `
      <div class="row">
        <div class="col-md-6">
          <img src="/img/${variantData.image}" alt="${variantData.variant_name}" class="img-fluid">
        </div>
        <div class="col-md-6">
          <h2>${variantData.variant_name}</h2>
          <p>${variantData.description}</p>
          <p><strong>Classification:</strong> ${variantData.classification_id}</p>
          <!-- Include classification attributes if needed -->
        </div>
      </div>`;

     const modalId = `#variantModal${variantData.variant_id}`;
    $(modalId).find('.modal-body').html(modalContent);

     const modalElement = new bootstrap.Modal(document.getElementById(`variantModal${variantData.variant_id}`));
    modalElement.show();
  });
});

// trivia js

document.getElementById('trivia-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const userResponse = document.getElementById('user-response').value.trim();
  const correctAnswer = document.getElementById('correct-answer').value.trim();
  let feedback = document.getElementById('feedback');

   if (userResponse.toLowerCase() === correctAnswer.toLowerCase()) {
    feedback.textContent = 'Correct!';
    feedback.style.color = 'green';
  } else {
    feedback.textContent = 'Wrong! The correct answer is ' + correctAnswer;
    feedback.style.color = 'red';
  }
});
