const esperar = () =>
  new Promise(resolve =>
    setTimeout(() => resolve("listo"), 2000)
  );

const test = async () => {
  console.log("antes");
  const r = await esperar();
  console.log(r);
  console.log("después");
};

test();
console.log("Node sigue libre");
