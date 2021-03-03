const obj = [
    {
      "id": 1,
      "lists": [
        {
          "names": [
            "Pepe",
            "Paco"
          ]
        }
      ]
    },
    {
      "id": 2,
      "lists": [
        {
          "names": [
            "Pepe2",
            "Paco2"
          ]
        }
      ]
    }
  ];

  const first = obj[0];
  console.log(first.lists[0]['names']);