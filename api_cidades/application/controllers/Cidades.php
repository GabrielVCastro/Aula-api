<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cidades extends CI_Controller {


	public function index(){

		$this->db->select("*");
		$this->db->from("cidades");

		if ((isset($_GET['estado'])) && ($_GET['estado']!="")) {
			$this->db->where("uf", $_GET['estado']);
		}

		$cidades = $this->db->get()->result();

		#var_dump($_GET);

		echo json_encode($cidades);

	}

	public function inserir(){
		$post = json_decode(file_get_contents('php://input'));

		#echo $post->nome;
		#var_dump($post);
		
		$cidades = $this->db->select("*")->from("cidades")->where("nome", $post->nome)->where("uf", $post->uf)->get();
		
		if($cidades->num_rows() > 0){
			echo json_encode(array(
				"success"=>false,
				"error"=>"Já existe um registro com essas informações"

			));
			exit;
		}



		$array_insert = array(
			"nome"=> $post->nome,
			"uf"=> $post->uf
		);

		$this->db->insert("cidades", $array_insert);

		echo json_encode(array(
			"success"=>true,
			"msg"=>"Inserido com sucesso"

		));
		exit;
	}

	public function excluir(){

		ob_start();
		json_encode($_REQUEST);
		ob_get_clean();
	 	

	
		
		$this->db->where("id", $_GET['excluir']);
		$this->db->delete("cidades");
		
		
		echo json_encode(array(
			"success"=>true,
			"msg"=>"Excluido com sucesso"

		));
		exit;
		





	}

	public function editar(){
		$post = json_decode(file_get_contents('php://input'));
		
		$inserir = array(
			"nome" => $post->nome,
			"uf" => $post->uf
 
			);
		$this->db->where("id", $post->id);
		$cidades = $this->db->update('cidades', $inserir);

		
		echo json_encode(array(
			"success"=>true,
			"msg"=>"Editado com sucesso"

		));
		exit;	
	
	header("Location: http://localhost/aula_js_api/index.html");

	}

	public function ordenar(){

		ob_start();
		json_encode($_REQUEST);
		ob_get_clean();
	 	

	
		
		$this->db->order_by($_GET['ordenar'], 'asc');
		$cidade = $this->db->select("*")->from("cidades")->get()->result();
		echo "<pre>";
		var_dump($cidade);
		echo "</pre>";


		//header("Location: http://localhost/aula_js_api/index.html");
		
    	
	
	}
}
