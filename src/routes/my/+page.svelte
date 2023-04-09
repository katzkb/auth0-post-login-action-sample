<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import { Card, Container, Col, Row, CardHeader, CardTitle, CardBody, CardText, Button } from "sveltestrap"
  let name = ''
  if (browser) {
    name = localStorage.getItem('name') ?? ''
  }
</script>
<Container fluid class="main-container">
  <Row class="align-items-center main-row">
    <Col class="col-sm-1 col-md-6 offset-md-3">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle>マイページ</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>ようこそ{name}さん。サービスは準備中です。</CardText>
          <a href="{$page.data.logoutUrl}"><Button>ログアウト</Button></a>
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