<?php
class requestEngine {
    private $githubAuth = "";
    private $endomondoAuth = "";

    public function get($url, $queryData = null) {
        if (isset($queryData)) $url .= '?'.http_build_query($queryData);

        $ch = curl_init();
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_USERAGENT => "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
        ));

        if (strpos($url, 'github') > 0 && isset($this->githubAuth)) curl_setopt($ch, CURLOPT_USERPWD, $this->githubAuth);

        $response = curl_exec($ch);

        if (!$response && curl_error($ch)) {
            echo "Something went wrong. CURL Error: ".curl_error($ch);
            curl_close($ch);
            return false;
        } else {
            curl_close($ch);

            if (isset($queryData['compression'])) {
                switch ($queryData['compression']) {
                    case 'gzip':
                        return gzinflate(substr($response, 10));
                    break;
                    case 'deflate':
                        return gzinflate(substr($response, 2));
                    break;
                }
            } else {
                return $response;
            }
        }
    }
}