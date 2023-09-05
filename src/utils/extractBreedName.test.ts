import extractBreedName from "./extractBreedName";

test("Base test", () => {
    expect(
        extractBreedName(
            "https://images.dog.ceo/breeds/saluki/n02091831_5123.jpg"
        )
    ).toBe("saluki");
    expect(
        extractBreedName(
            "https://images.dog.ceo/breeds/redbone/n02090379_2934.jpg"
        )
    ).toBe("redbone");
    expect(
        extractBreedName(
            "https://images.dog.ceo/breeds/terrier-dandie/n02096437_702.jpg"
        )
    ).toBe("terrier-dandie");
    expect(
        extractBreedName(
            "https://images.dog.ceo/breeds/pekinese/n02086079_14208.jpg"
        )
    ).toBe("pekinese");
});
