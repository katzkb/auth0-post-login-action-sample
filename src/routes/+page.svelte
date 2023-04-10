<script lang="ts">
  import { Card, Container, Col, Row, CardHeader, CardTitle, CardBody, CardText, Button } from "sveltestrap"
  import { page } from '$app/stores'
  import { browser } from '$app/environment'
  if (browser) {
    if (localStorage.getItem('name')) {
      window.location.href = '/my'
    }
  }
</script>
<Container fluid class="main-container">
  <Row class="align-items-center main-row">
    <Col class="col-sm-1 col-md-6 offset-md-3">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle>トップページ</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>サービスは準備中です。事前の会員登録は下記からどうぞ。</CardText>
          <a href="/auth/login/step/1?screenHint=signup"><Button>会員登録</Button></a>
          <a href="/auth/login/step/1?screenHint=login"><Button>ログイン</Button></a>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>
<style lang="scss">
  :global(.main-container) {
    height: 100vh;
  }
  :global(.main-row) {
    height: 100%;
  }
</style>