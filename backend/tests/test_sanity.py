def test_homepage_not_found(client):
    res = client.get("/") 
    assert res.status_code == 404
