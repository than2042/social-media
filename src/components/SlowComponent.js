async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

export default async function SlowComponent() {
  await delay();
  return <p>Please Wait a few seconds!!!</p>;
}
