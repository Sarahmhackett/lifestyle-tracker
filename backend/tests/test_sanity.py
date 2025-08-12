def test_homepage_not_found(client):
    res = client.get("/")  # try going to a door that doesn’t exist
    assert res.status_code == 404  # Flask should say "door not found"
