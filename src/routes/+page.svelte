<script lang="ts">
  import { Card, Container, Col, Row, CardHeader, CardTitle, CardBody, CardText, Button } from "sveltestrap"
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
          <Button>会員登録</Button>
          <Button>ログイン</Button>
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