export async function getReviews(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(`https://learn.codeit.kr/7517/film-reviews?${query}`);
  const body = await response.json();
  return body;
}

// const member= {
//     name: "Alice",
//     email: "alick@codeitmall.kr",
//     department: "marketing",
// };

// fetch("https://learn.codeit.kr/api/members/2",{
//     method: 'PUT',
//     body: JSON.stringify(member),
// })
//   .then((response) => response.text())
//   .then((result) => {
//     console.log(result);
//   });
